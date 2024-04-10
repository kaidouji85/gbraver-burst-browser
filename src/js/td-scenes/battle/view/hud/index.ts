import { Observable } from "rxjs";
import * as THREE from "three";

import type { PreRender } from "../../../../game-loop/pre-render";
import type { Update } from "../../../../game-loop/update";
import type { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { gameObjectStream } from "../../../../game-object/action/game-object-action";
import { PlainHUDCamera } from "../../../../game-object/camera/plain-hud/plain-hud-camera";
import type { OverlapEvent } from "../../../../render/overlap-event/overlap-event";
import type { OverlapNotifier } from "../../../../render/overlap-notifier";
import type { BattleSceneAction } from "../../actions";
import { GenerateBattleViewParams } from "../generate-params";
import { enemyArmdozerHUD, playerArmdozerHUD } from "./armdozer-objects";
import type { HUDArmdozerObjects } from "./armdozer-objects/hud-armdozer-objects";
import { HUDGameObjects } from "./game-objects";
import { GenerateHUDLayerObjectParams } from "./generate-params";
import { enemyHUDPilotObjects, playerHUDPilotObjects } from "./pilot-objects";
import type { HUDPilotObjects } from "./pilot-objects/hud-pilot-objects";
import { enemyHUDObjects, HUDPlayer, playerHUDObjects } from "./player";

/** コンストラクタのパラメータ */
type Param = GenerateBattleViewParams & {
  /** レンダラ */
  renderer: OverlapNotifier;
  /** アップデート */
  update: Observable<Update>;
  /** プリレンダ */
  preRender: Observable<PreRender>;
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
  #overlap: Observable<OverlapEvent>;
  #gameObjectAction: Observable<GameObjectAction>;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera(param.resize);
    this.#overlap = param.renderer.createOverlapNotifier(
      this.camera.getCamera(),
    );
    this.#gameObjectAction = gameObjectStream(
      param.update,
      param.preRender,
      this.#overlap,
    );
    const generateParams: GenerateHUDLayerObjectParams = {
      ...param,
      gameObjectAction: this.#gameObjectAction,
    };
    this.gameObjects = new HUDGameObjects(generateParams);
    this.gameObjects.getObject3Ds().forEach((object) => {
      this.scene.add(object);
    });
    this.players = [
      playerHUDObjects(generateParams),
      enemyHUDObjects(generateParams),
    ];
    this.players
      .map((v) => v.getObject3Ds())
      .flat()
      .forEach((v) => {
        this.scene.add(v);
      });
    this.armdozers = [
      playerArmdozerHUD(generateParams),
      enemyArmdozerHUD(generateParams),
    ];
    this.armdozers
      .map((v) => v.getObject3Ds())
      .flat()
      .forEach((v) => {
        this.scene.add(v);
      });
    this.pilots = [
      playerHUDPilotObjects(generateParams),
      enemyHUDPilotObjects(generateParams),
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
  battleActionNotifier(): Observable<BattleSceneAction> {
    return this.gameObjects.battleActionNotifier();
  }
}
