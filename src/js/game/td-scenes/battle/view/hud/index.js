// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../../resource';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Observable, Subject, Subscription} from "rxjs";
import type {TdDOMEvent} from "../../../../../action/td-dom";
import {toOverlapStream} from "../../../../../action/overlap/overlap-stream";
import type {BattleSceneAction} from "../../../../../action/battle-scene";
import type {Update} from "../../../../../action/game-loop/update";
import type {GameLoop} from "../../../../../action/game-loop/game-loop";
import type {PreRender} from "../../../../../action/game-loop/pre-render";
import type {Render} from "../../../../../action/game-loop/render";
import {PlainHUDCamera} from "../../../../../game-object/camera/plain-hud";
import type {HUDGameObjects} from "./game-objects";
import {appendHUDGameObjects, createHUDGameObjects, disposeHUDGameObjects} from "./game-objects";
import type {OverlapAction} from "../../../../../action/overlap";
import {gameObjectStream} from "../../../../../action/game-object-action/game-object-stream";
import type {SafeAreaInset} from "../../../../../safe-area/safe-area-inset";
import type {Resize} from "../../../../../action/resize/resize";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  safeAreaInset: SafeAreaInset,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<TdDOMEvent>,
  }
};

/** イベント通知 */
type Notifier = {
  battleAction: Observable<BattleSceneAction>,
  render: Observable<Render>
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  scene: THREE.Scene;
  camera: PlainHUDCamera;
  gameObjects: HUDGameObjects;

  _rendererDOM: HTMLElement;
  _safeAreaInset: SafeAreaInset;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;
  _overlap: Observable<OverlapAction>;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._rendererDOM = param.rendererDOM;
    this._safeAreaInset = param.safeAreaInset;
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = new Subject();

    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera({
      listener: {
        domEvent: param.listener.domEvent
      }
    });

    this._overlap = toOverlapStream(param.listener.domEvent, this._rendererDOM, this.camera.getCamera());
    const gameObjectAction = gameObjectStream(this._update, this._preRender, this._overlap);

    const player = param.players.find(v => v.playerId === param.playerId)
      || param.players[0];
    this.gameObjects = createHUDGameObjects(param.resources, gameObjectAction, player);
    appendHUDGameObjects(this.scene, this.gameObjects);

    this._subscription = [
      param.listener.gameLoop.subscribe(action => {
        this._gameLoop(action);
      }),

      param.listener.domEvent.subscribe(action => {
        if (action.type === 'resize') {
          this._resize(action);
        }
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    disposeHUDGameObjects(this.gameObjects);
    this.camera.destructor();
    this.scene.dispose();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * イベント通知ストリームを取得
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._render,
      battleAction: this.gameObjects.notifier.battleSceneAction
    };
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera(),
      safeAreaInset: this._safeAreaInset,
      rendererDOM: this._rendererDOM,
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera(),
    });
  }

  /** リサイズ */
  _resize(action: Resize): void {
    this._safeAreaInset = action.safeAreaInset;
  }
}