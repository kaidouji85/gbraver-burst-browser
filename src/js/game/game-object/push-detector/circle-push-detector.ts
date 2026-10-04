import { Observable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../action/game-object-action";
import { createPushDetector, PushDetector } from "./index";

/** 円形プッシュ検出生成のパラメータ */
type CirclePushDetectorParam = {
  /** 円半径 */
  radius: number;
  /** 円分割数 */
  segments: number;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
  /**
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean;
};

/**
 * 円形プッシュ検出を生成する
 * @param param パラメータ
 * @returns プッシュ検出
 */
export function circlePushDetector(
  param: CirclePushDetectorParam,
): PushDetector {
  const { radius, segments } = param;
  const geometry = new THREE.CircleGeometry(radius, segments);
  return createPushDetector({
    ...param,
    geometry,
  });
}
