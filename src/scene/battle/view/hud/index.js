// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {merge, Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../../../action/dom-event";
import {toOverlapObservable} from "../../../../action/overlap/dom-event-to-overlap";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {Update} from "../../../../action/game-loop/update";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import type {Render} from "../../../../action/game-loop/render";
import {BattleHUDCamera} from "../../../../game-object/camera/battle-hud";
import type {HUDPlayer} from "./player";
import {appendHUDPlayer} from "./player";
import {enemyHUDObjects} from "./player/enemy";
import {playerHUDObjects} from "./player/player";
import type {HUDGameObjects} from "./game-objects";
import {appendHUDGameObjects, createHUDGameObjects} from "./game-objects";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>,
  },
  notifier: {
    battleAction: Observer<BattleSceneAction>,
    render: Observer<Render>
  }
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  scene: THREE.Scene;
  camera: BattleHUDCamera;
  players: HUDPlayer[];
  gameObjects: HUDGameObjects;
  _update: Subject<Update>;
  _preRender: Subject<PreRender>;
  _render: Observer<Render>;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = new BattleHUDCamera({
      listener: {
        domEvent: param.listener.domEvent
      }
    });

    this._update = new Subject();
    this._preRender = new Subject();
    this._render = param.notifier.render;

    const player = param.players.find(v => v.playerId === param.playerId)
      || param.players[0];
    const enemy = param.players.find(v => v.playerId !== param.playerId)
      || param.players[0];
    const gameObjectAction: Observable<GameObjectAction> = merge(
      toOverlapObservable(param.listener.domEvent, param.rendererDOM, this.camera.getCamera()),
      this._update,
      this._preRender
    );

    this.players = [
      playerHUDObjects(param.resources, gameObjectAction, player),
      enemyHUDObjects(param.resources, gameObjectAction, enemy),
    ];
    this.players.forEach(v => {
      appendHUDPlayer(this.scene, v);
    });

    this.gameObjects = createHUDGameObjects(param.resources, gameObjectAction, param.notifier.battleAction, player);
    appendHUDGameObjects(this.scene, this.gameObjects);

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    this._update.next({
      type: 'Update',
      time: action.time
    });

    this._preRender.next({
      type: 'PreRender',
      camera: this.camera.getCamera()
    });

    this._render.next({
      type: 'Render',
      scene: this.scene,
      camera: this.camera.getCamera()
    });
  }
}