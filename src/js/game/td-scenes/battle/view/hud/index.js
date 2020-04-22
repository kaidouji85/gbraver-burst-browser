// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../../resource';
import type {Player, PlayerId} from "gbraver-burst-core";
import {Observable} from "rxjs";
import type {TdDOMEvent} from "../../../../../action/td-dom";
import {toOverlapStream} from "../../../../../action/overlap/overlap-stream";
import type {BattleSceneAction} from "../../../../../action/battle-scene";
import type {Update} from "../../../../../action/game-loop/update";
import type {PreRender} from "../../../../../action/game-loop/pre-render";
import {PlainHUDCamera} from "../../../../../game-object/camera/plain-hud";
import {HUDGameObjects, appendHUDGameObjects, disposeHUDGameObjects} from "./game-objects";
import type {OverlapAction} from "../../../../../action/overlap";
import {gameObjectStream} from "../../../../../action/game-object-action/game-object-stream";
import type {Resize} from "../../../../../action/resize/resize";
import type {HUDArmdozer} from "./armdozer";
import {enemyArmdozerHUD, playerArmdozerHUD} from "./armdozer";
import {enemyHUDObjects, HUDPlayer, playerHUDObjects} from "./player";
import type {GameObjectAction} from "../../../../../action/game-object-action";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  playerId: PlayerId,
  players: Player[],
  listener: {
    update: Observable<Update>,
    preRender: Observable<PreRender>,
    domEvent: Observable<TdDOMEvent>,
    resize: Observable<Resize>,
  }
};

/** イベント通知 */
type Notifier = {
  battleAction: Observable<BattleSceneAction>,
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 */
export class HudLayer {
  scene: THREE.Scene;
  camera: PlainHUDCamera;
  players: HUDPlayer[];
  armdozers: HUDArmdozer[];
  gameObjects: HUDGameObjects;
  _overlap: Observable<OverlapAction>;
  _gameObjectAction: Observable<GameObjectAction>;

  constructor(param: Param) {

    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera(param.listener.resize);

    this._overlap = toOverlapStream(param.listener.domEvent, param.rendererDOM, this.camera.getCamera());
    this._gameObjectAction = gameObjectStream(param.listener.update, param.listener.preRender, this._overlap);

    const player = param.players.find(v => v.playerId === param.playerId)
      || param.players[0];
    this.gameObjects = new HUDGameObjects(param.resources, this._gameObjectAction, player);
    appendHUDGameObjects(this.scene, this.gameObjects);

    this.players = param.players.map(v => v.playerId === param.playerId
      ? playerHUDObjects(param.resources, v, this._gameObjectAction)
      : enemyHUDObjects(param.resources, v, this._gameObjectAction)
    );
    this.players.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.armdozers = param.players.map(v => v.playerId === param.playerId
      ? playerArmdozerHUD(param.resources, this._gameObjectAction, v)
      : enemyArmdozerHUD(param.resources, this._gameObjectAction, v)
    );
    this.armdozers.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v)
      });
  }

  /** デストラクタ */
  destructor(): void {
    disposeHUDGameObjects(this.gameObjects);
    this.armdozers.forEach(armdozer => {
      armdozer.getObject3Ds().forEach(object => {
        this.scene.remove(object);
      });
      armdozer.destructor();
    });
    this.players.forEach(player => {
      player.getObject3Ds().forEach(object => {
        this.scene.remove(object);
      });
      player.destructor();
    });

    this.camera.destructor();
    this.scene.dispose();
  }

  /**
   * イベント通知ストリームを取得
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      battleAction: this.gameObjects.notifier.battleSceneAction
    };
  }
}