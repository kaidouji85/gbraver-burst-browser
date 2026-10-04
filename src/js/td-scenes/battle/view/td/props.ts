import { Observable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../../../../game/game-object/action/game-object-action";
import { TDCamera } from "../../../../game/game-object/camera/td";
import { OverlapEvent } from "../../../../web-gl/render/overlap-event/overlap-event";
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
  armdozers: TDArmdozerObjects[];
  /** その他ゲームオブジェクト */
  gameObjects: TDGameObjects;
  /** オーバーラップ */
  overlap: Observable<OverlapEvent>;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
