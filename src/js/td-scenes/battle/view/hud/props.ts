import { Observable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { PlainHUDCamera } from "../../../../game-object/camera/plain-hud/plain-hud-camera";
import { OverlapEvent } from "../../../../render/overlap-event/overlap-event";
import { HUDArmdozerObjects } from "./armdozer-objects/hud-armdozer-objects";
import { HUDGameObjects } from "./game-objects";
import { HUDPilotObjects } from "./pilot-objects/hud-pilot-objects";
import { HUDPlayer } from "./player";

/** HUDレイヤー プロパティ */
export type HUDLayerProps = {
  /** シーン */
  scene: THREE.Scene;
  /** カメラー */
  camera: PlainHUDCamera;
  /** プレイヤーオブジェクト */
  players: HUDPlayer[];
  /** アームドーザ */
  armdozers: HUDArmdozerObjects[];
  /** パイロット */
  pilots: HUDPilotObjects[];
  /** その他ゲームオブジェクト */
  gameObjects: HUDGameObjects;
  /** オーバーラップ */
  overlap: Observable<OverlapEvent>;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
