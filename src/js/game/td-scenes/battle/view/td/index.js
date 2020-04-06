// @flow
import type {Resources} from '../../../../../resource';
import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core";
import {Observable, Subject, Subscription} from "rxjs";
import type {Update} from "../../../../../action/game-loop/update";
import type {PreRender} from "../../../../../action/game-loop/pre-render";
import type {GameLoop} from "../../../../../action/game-loop/game-loop";
import type {Render} from "../../../../../action/game-loop/render";
import {TDCamera} from "../../../../../game-object/camera/td";
import type {TdDOMEvent} from "../../../../../action/td-dom";
import type {TDPlayer} from "./player";
import {enemyTDObject, playerTDObjects} from "./player";
import type {TDGameObjects} from "./game-objects";
import {appendTDGameObjects, createTDGameObjects, disposeTDGameObjects} from "./game-objects";
import {toOverlapStream} from "../../../../../action/overlap/overlap-stream";
import type {OverlapAction} from "../../../../../action/overlap";
import {gameObjectStream} from "../../../../../action/game-object-action/game-object-stream";
import type {SafeAreaInset} from "../../../../../safe-area/safe-area-inset";
import type {Resize} from "../../../../../action/resize/resize";
import {skyBox} from "./sky-box";
import {enemySprite, playerSprite, TDSprite} from "./sprite";
import type {TDArmdozer} from "./armdozer";
import {enemyTDArmdozer, playerTDArmdozer} from "./armdozer";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理 */
  resources: Resources,
  /** プレイヤーID */
  playerId: PlayerId,
  /** プレイヤー情報 */
  players: Player[],
  /** レンダリング対象のHTML要素 */
  rendererDOM: HTMLElement,
  /** SafeAreaInsetの初期値 */
  safeAreaInset: SafeAreaInset,
  /** イベントリスナ */
  listener: {
    /** DOMイベント */
    domEvent: Observable<TdDOMEvent>,
    /** リサイズイベント */
    resize: Observable<Resize>,
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>
};

/** 3Dレイヤー */
export class ThreeDimensionLayer {
  scene: THREE.Scene;
  camera: TDCamera;
  players: TDPlayer[];
  sprites: TDSprite[];
  armdozers: TDArmdozer[];
  gameObjects: TDGameObjects;

  _rendererDOM: HTMLElement;
  _safeAreaInset: SafeAreaInset;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;
  _overlap: Observable<OverlapAction>;
  _subscription: Subscription[];

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this._rendererDOM = param.rendererDOM;
    this._safeAreaInset = param.safeAreaInset;
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = new Subject();

    this.scene = new THREE.Scene();
    this.scene.background = skyBox(param.resources);

    this.camera = new TDCamera(this._update, param.listener.resize);

    this._overlap = toOverlapStream(param.listener.domEvent, this._rendererDOM, this.camera.getCamera());
    const gameObjectAction = gameObjectStream(this._update, this._preRender, this._overlap);

    this.players = [
      playerTDObjects(param.resources, player, gameObjectAction),
      enemyTDObject(param.resources, enemy, gameObjectAction)
    ];
    this.players.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.sprites = param.players.map(v => v.playerId === param.playerId
      ? playerSprite(param.resources, v, gameObjectAction)
      : enemySprite(param.resources, v, gameObjectAction)
    );
    this.sprites.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.armdozers = param.players.map(v => v.playerId === param.playerId
      ? playerTDArmdozer(param.resources, gameObjectAction, v)
      : enemyTDArmdozer(param.resources, gameObjectAction, v)
    );
    this.armdozers.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });
    this.armdozers.forEach(armdozer => {
      this.sprites
        .filter(sprite => sprite.playerId === armdozer.playerId)
        .forEach(sprite => {
          armdozer.getUnderSprite().forEach(object3D => {
            sprite.sprite.addObject3D(object3D);
          });
        })
    });

    this.gameObjects = createTDGameObjects(param.resources, gameObjectAction);
    appendTDGameObjects(this.scene, this.gameObjects);

    this._subscription = [
      param.listener.resize.subscribe(action => {
        this._resize(action);
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this.scene.background.dispose();
    this.players.forEach(v => {
      v.destructor();
    });
    this.sprites.forEach(v => {
      v.destructor();
    });
    this.armdozers.forEach(v => {
      v.destructor();
    });
    disposeTDGameObjects(this.gameObjects);
    this.camera.destructor();
    this.scene.dispose();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._render
    };
  }

  /**
   * ゲームループの処理
   * 本メソッドはBattleSceneViewからのみ呼ばれることを想定している
   *
   * @param action アクション
   */
  gameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera(),
      rendererDOM: this._rendererDOM,
      safeAreaInset: this._safeAreaInset,
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }

  /**
   * リサイズ時の処理
   *
   * @param action アクション
   */
  _resize(action: Resize): void {
    this._safeAreaInset = action.safeAreaInset;
  }
}