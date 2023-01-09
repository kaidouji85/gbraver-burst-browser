import type { Player } from "gbraver-burst-core";
import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { Update } from "../../../../game-loop/update";
import type { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { gameObjectStream } from "../../../../game-object/action/game-object-action";
import { PlainHUDCamera } from "../../../../game-object/camera/plain-hud/plain-hud-camera";
import type { OverlapEvent } from "../../../../render/overlap-event/overlap-event";
import type { OverlapNotifier } from "../../../../render/overlap-notifier";
import type { Resources } from "../../../../resource";
import type { Stream } from "../../../../stream/stream";
import type { Resize } from "../../../../window/resize";
import type { BattleSceneAction } from "../../actions";
import { enemyArmdozerHUD, playerArmdozerHUD } from "./armdozer-objects";
import type { HUDArmdozerObjects } from "./armdozer-objects/hud-armdozer-ibjects";
import { HUDGameObjects } from "./game-objects";
import { enemyHUDPilotObjects, playerHUDPilotObjects } from "./pilot-objects";
import type { HUDPilotObjects } from "./pilot-objects/hud-pilot-objects";
import { enemyHUDObjects, HUDPlayer, playerHUDObjects } from "./player";

/** コンストラクタのパラメータ */
export type Param = {
  resources: Resources;
  renderer: OverlapNotifier;
  player: Player;
  enemy: Player;
  update: Stream<Update>;
  preRender: Stream<PreRender>;
  resize: Stream<Resize>;
};

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 */
export class HudLayer {
  scene: THREE.Scene;
  camera: PlainHUDCamera;
  players: HUDPlayer[];
  armdozers: HUDArmdozerObjects[];
  pilots: HUDPilotObjects[];
  gameObjects: HUDGameObjects;
  #overlap: Stream<OverlapEvent>;
  #gameObjectAction: Stream<GameObjectAction>;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera(param.resize);
    this.#overlap = param.renderer.createOverlapNotifier(
      this.camera.getCamera()
    );
    this.#gameObjectAction = gameObjectStream(
      param.update,
      param.preRender,
      this.#overlap
    );
    this.gameObjects = new HUDGameObjects(
      param.resources,
      this.#gameObjectAction,
      param.player
    );
    this.gameObjects.getObject3Ds().forEach((object) => {
      this.scene.add(object);
    });
    this.players = [
      playerHUDObjects(param.resources, param.player, this.#gameObjectAction),
      enemyHUDObjects(param.resources, param.enemy, this.#gameObjectAction),
    ];
    this.players
      .map((v) => v.getObject3Ds())
      .flat()
      .forEach((v) => {
        this.scene.add(v);
      });
    this.armdozers = [
      playerArmdozerHUD(param.resources, this.#gameObjectAction, param.player),
      enemyArmdozerHUD(param.resources, this.#gameObjectAction, param.enemy),
    ];
    this.armdozers
      .map((v) => v.getObject3Ds())
      .flat()
      .forEach((v) => {
        this.scene.add(v);
      });
    this.pilots = [
      playerHUDPilotObjects(
        param.resources,
        this.#gameObjectAction,
        param.player
      ),
      enemyHUDPilotObjects(
        param.resources,
        this.#gameObjectAction,
        param.enemy
      ),
    ];
    this.pilots
      .map((v) => v.getObject3Ds())
      .flat()
      .forEach((v) => {
        this.scene.add(v);
      });
  }

  /** デストラクタ */
  destructor(): void {
    const removeTargets: THREE.Object3D[] = [
      ...this.gameObjects.getObject3Ds(),
      ...this.armdozers.flatMap((v) => v.getObject3Ds()),
      ...this.players.flatMap((v) => v.getObject3Ds()),
      ...this.pilots.flatMap((v) => v.getObject3Ds()),
    ];
    removeTargets.forEach((v) => {
      this.scene.remove(v);
    });
    this.gameObjects.destructor();
    this.armdozers.forEach((armdozer) => {
      armdozer.destructor();
    });
    this.players.forEach((player) => {
      player.destructor();
    });
    this.pilots.forEach((pilot) => {
      pilot.destructor();
    });
    this.camera.destructor();
  }

  /**
   * 戦闘シーンアクション通知
   * @return 通知ストリーム
   */
  battleActionNotifier(): Stream<BattleSceneAction> {
    return this.gameObjects.battleActionNotifier();
  }
}
