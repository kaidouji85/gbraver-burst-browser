import type { Player } from "gbraver-burst-core";
import * as THREE from "three";
import type { PreRender } from "../../../../game-loop/pre-render";
import type { Update } from "../../../../game-loop/update";
import type { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { gameObjectStream } from "../../../../game-object/action/game-object-action";
import { TDCamera } from "../../../../game-object/camera/td";
import type { OverlapEvent } from "../../../../render/overlap-event/overlap-event";
import type { OverlapNotifier } from "../../../../render/overlap-notifier";
import type { Resources } from "../../../../resource";
import type { Stream } from "../../../../stream/stream";
import type { Resize } from "../../../../window/resize";
import { enemyTDArmdozer, playerTDArmdozer } from "./armdozer-objects";
import type { TDArmdozerObjects } from "./armdozer-objects/armdozer-objects";
import { TDGameObjects } from "./game-objects";
import type { TDPlayer } from "./player";
import { enemyTDObject, playerTDObjects } from "./player";
import { skyBox } from "./sky-box";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources;
  renderer: OverlapNotifier;
  player: Player;
  enemy: Player;
  resize: Stream<Resize>;
  update: Stream<Update>;
  preRender: Stream<PreRender>;
};

/** 3Dレイヤー */
export class ThreeDimensionLayer {
  scene: THREE.Scene;
  camera: TDCamera;
  players: TDPlayer[];
  armdozerObjects: TDArmdozerObjects[];
  gameObjects: TDGameObjects;
  #overlap: Stream<OverlapEvent>;
  #gameObjectAction: Stream<GameObjectAction>;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.scene.background = skyBox(param.resources);
    this.camera = new TDCamera(param.update, param.resize);
    this.#overlap = param.renderer.createOverlapNotifier(this.camera.getCamera());
    this.#gameObjectAction = gameObjectStream(param.update, param.preRender, this.#overlap);
    this.players = [playerTDObjects(param.resources, param.player, this.#gameObjectAction), enemyTDObject(param.resources, param.enemy, this.#gameObjectAction)];
    this.players.map(v => v.getObject3Ds()).flat().forEach(v => {
      this.scene.add(v);
    });
    this.armdozerObjects = [playerTDArmdozer(param.resources, this.#gameObjectAction, param.player), enemyTDArmdozer(param.resources, this.#gameObjectAction, param.enemy)];
    this.armdozerObjects.map(v => v.getObject3Ds()).flat().forEach(v => {
      this.scene.add(v);
    });
    this.gameObjects = new TDGameObjects(param.resources, this.#gameObjectAction);
    this.gameObjects.getObject3Ds().forEach(object => {
      this.scene.add(object);
    });
  }

  /** デストラクタ */
  destructor(): void {
    const removeTargets: THREE.Object3D[] = [...this.players.flatMap(v => v.getObject3Ds()), ...this.armdozerObjects.flatMap(v => v.getObject3Ds()), ...this.gameObjects.getObject3Ds()];
    removeTargets.forEach(v => {
      this.scene.remove(v);
    });
    if (this.scene.background instanceof THREE.Texture) {
      this.scene.background.dispose();
    }
    this.scene.background = null;
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