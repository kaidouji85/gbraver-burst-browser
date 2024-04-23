import { Observable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { TDCamera } from "../../../../game-object/camera/td";
import { OverlapEvent } from "../../../../render/overlap-event/overlap-event";
import { TDArmdozerObjects } from "./armdozer-objects/armdozer-objects";
import { TDGameObjects } from "./game-objects";
import { TDPlayer } from "./player";

/** 3Dレイヤー */
export type TDLayerProps = {
  /** シーン */
  scene: THREE.Scene;
  /** カメラ */
  camera: TDCamera;
  /** プレイヤーオブジェクト */
  players: TDPlayer[];
  /** アームドーザ */
  armdozerObjects: TDArmdozerObjects[];
  /** その他ゲームオブジェクト */
  gameObjects: TDGameObjects;
  /** オーバーラップ */
  overlap: Observable<OverlapEvent>;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
