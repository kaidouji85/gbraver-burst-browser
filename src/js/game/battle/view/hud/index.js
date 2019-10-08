// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Observable, Subject, Subscription} from "rxjs";
import type {DOMEvent} from "../../../../action/dom-event";
import {toOverlapObservable} from "../../../../action/overlap/dom-event-to-overlap";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {Update} from "../../../../action/game-loop/update";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {Render} from "../../../../action/game-loop/render";
import {PlainHUDCamera} from "../../../../game-object/camera/plain-hud";
import type {HUDPlayer} from "./player";
import {appendHUDPlayer, destructorHUDPlayer} from "./player";
import {enemyHUDObjects} from "./player/enemy";
import {playerHUDObjects} from "./player/player";
import type {HUDGameObjects} from "./game-objects";
import {appendHUDGameObjects, createHUDGameObjects, destructorHUDGameObjects} from "./game-objects";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
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
  players: HUDPlayer[];
  gameObjects: HUDGameObjects;

  _rendererDOM: HTMLElement;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Subject<Render>;
  _gameObjectAction: Subject<GameObjectAction>;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._rendererDOM = param.rendererDOM;
    this._update = new Subject();
    this._preRender = new Subject();
    this._render = new Subject();
    this._gameObjectAction = new Subject();

    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera({
      listener: {
        domEvent: param.listener.domEvent
      }
    });

    const player = param.players.find(v => v.playerId === param.playerId)
      || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId)
      || param.players[0];
    this.players = [
      playerHUDObjects(param.resources, this._gameObjectAction, player),
      enemyHUDObjects(param.resources, this._gameObjectAction, enemy),
    ];
    this.players.forEach(v => {
      appendHUDPlayer(this.scene, v);
    });

    this.gameObjects = createHUDGameObjects(param.resources, this._gameObjectAction, player);
    appendHUDGameObjects(this.scene, this.gameObjects);

    this._subscription = [
      param.listener.gameLoop.subscribe(action => {
        this._gameLoop(action);
      }),
      toOverlapObservable(param.listener.domEvent, this._rendererDOM, this.camera.getCamera())
        .subscribe(this._gameObjectAction),
      this._update.subscribe(this._gameObjectAction),
      this._preRender.subscribe(this._gameObjectAction),
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this.players.forEach(v => {
      destructorHUDPlayer(v);
    });
    destructorHUDGameObjects(this.gameObjects);
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
      rendererDOM: this._rendererDOM,
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }
}