// @flow

import type {Resources} from '../../../../../resource';
import * as THREE from 'three';
import type {Player} from "gbraver-burst-core";
import type {Update} from "../../../../../game-loop/update";
import type {PreRender} from "../../../../../game-loop/pre-render";
import {TDCamera} from "../../../../../game-object/camera/td";
import type {TDPlayer} from "./player";
import {enemyTDObject, playerTDObjects} from "./player";
import {TDGameObjects} from "./game-objects";
import type {OverlapEvent} from "../../../../../render/overlap-event/overlap-event";
import {gameObjectStream} from "../../../../../game-object/action/game-object-action";
import type {Resize} from "../../../../../window/resize";
import {skyBox} from "./sky-box";
import {enemyTDArmdozer, playerTDArmdozer} from "./armdozer-objects";
import type {TDArmdozerObjects} from "./armdozer-objects/armdozer-objects";
import type {GameObjectAction} from "../../../../../game-object/action/game-object-action";
import type {OverlapNotifier} from "../../../../../render/overla-notifier";
import type {Stream} from "../../../../../stream/core";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: OverlapNotifier,
  player: Player,
  enemy: Player,
  listener: {
    resize: Stream<Resize>,
    update: Stream<Update>,
    preRender: Stream<PreRender>,
  }
};

/** 3Dレイヤー */
export class ThreeDimensionLayer {
  scene: typeof THREE.Scene;
  camera: TDCamera;
  players: TDPlayer[];
  armdozerObjects: TDArmdozerObjects[];
  gameObjects: TDGameObjects;
  _overlap: Stream<OverlapEvent>;
  _gameObjectAction: Stream<GameObjectAction>;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.scene.background = skyBox(param.resources);

    this.camera = new TDCamera(param.listener.update, param.listener.resize);

    this._overlap = param.renderer.createOverlapNotifier(this.camera.getCamera());
    this._gameObjectAction = gameObjectStream(param.listener.update, param.listener.preRender, this._overlap);

    this.players = [
      playerTDObjects(param.resources, param.player, this._gameObjectAction),
      enemyTDObject(param.resources, param.enemy, this._gameObjectAction)
    ];
    this.players.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });


    this.armdozerObjects = [
      playerTDArmdozer(param.resources, this._gameObjectAction, param.player),
      enemyTDArmdozer(param.resources, this._gameObjectAction, param.enemy)
    ];
    this.armdozerObjects.map(v => v.getObject3Ds())
      .flat()
      .forEach(v => {
        this.scene.add(v);
      });

    this.gameObjects = new TDGameObjects(param.resources, this._gameObjectAction);
    this.gameObjects.getObject3Ds().forEach(object => {
      this.scene.add(object);
    });
  }

  /** デストラクタ */
  destructor(): void {
    const removeTargets: typeof THREE.Object3D[] = [
      ...this.players.flatMap(v => v.getObject3Ds()),
      ...this.armdozerObjects.flatMap(v => v.getObject3Ds()),
      ...this.gameObjects.getObject3Ds()
    ];
    removeTargets.forEach(v => {
      this.scene.remove(v);
    });

    this.scene.background.dispose();
    this.players.forEach(player => {
      player.destructor();
    });
    this.armdozerObjects.forEach(armdozer => {
      armdozer.destructor();
    });
    this.gameObjects.destructor();
    this.camera.destructor();
  }
}