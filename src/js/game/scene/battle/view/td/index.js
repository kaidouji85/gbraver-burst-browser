// @flow
import type {Resources} from '../../../../../resource';
import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Observable, Subject, Subscription} from "rxjs";
import type {Update} from "../../../../../action/game-loop/update";
import type {PreRender} from "../../../../../action/game-loop/pre-render";
import type {GameLoop} from "../../../../../action/game-loop/game-loop";
import type {Render} from "../../../../../action/game-loop/render";
import {Battle3DCamera} from "../../../../../game-object/camera/battle-3d";
import type {DOMEvent} from "../../../../../action/dom-event";
import type {TDPlayer} from "./player";
import {appendTDPlayer, destructorTDPlayer} from "./player";
import {playerTDObjects} from "./player/player";
import {enemyTDObject} from "./player/enemy";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "./game-objects";
import {appendTDGameObjects, createTDGameObjects, destructorTDGameObjects} from "./game-objects";
import {toOverlapObservable} from "../../../../../action/overlap/dom-event-to-overlap";
import type {OverlapAction} from "../../../../../action/overlap";
import {toGameObjectActionObservable} from "../../../../../action/game-object-action/create-listener";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  playerId: PlayerId,
  players: Player[],
  rendererDOM: HTMLElement,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>,
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>
};

/** 3Dレイヤー */
export class ThreeDimensionLayer {
  scene: THREE.Scene;
  camera: Battle3DCamera;
  players: TDPlayer<ArmDozerSprite>[];
  gameObjects: TDGameObjects;

  _rendererDOM: HTMLElement;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;
  _overlap: Observable<OverlapAction>;
  _subscription: Subscription;

  constructor(param: Param) {
    const player = param.players.find(v => v.playerId === param.playerId) || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId) || param.players[0];

    this._rendererDOM = param.rendererDOM;
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = new Subject();

    this.scene = new THREE.Scene();
    this.camera = new Battle3DCamera({
      listener: {
        domEvent: param.listener.domEvent,
        update: this._update
      }
    });

    this._overlap = toOverlapObservable(param.listener.domEvent, this._rendererDOM, this.camera.getCamera());
    const gameObjectAction = toGameObjectActionObservable(this._update, this._preRender, this._overlap);

    this.players = [
      playerTDObjects(param.resources, player, gameObjectAction),
      enemyTDObject(param.resources, enemy, gameObjectAction)
    ];
    this.players.forEach(v => {
      appendTDPlayer(this.scene, v);
    });

    this.gameObjects = createTDGameObjects(param.resources, gameObjectAction);
    appendTDGameObjects(this.scene, this.gameObjects);

    this._subscription = param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.players.forEach(v => {
      destructorTDPlayer(v);
    });
    destructorTDGameObjects(this.gameObjects);
    this.camera.destructor();
    this.scene.dispose();
    this._subscription.unsubscribe();
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

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera(),
      rendererDOM: this._rendererDOM,
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }
}