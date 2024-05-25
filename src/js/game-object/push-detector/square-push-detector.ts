import { Observable } from "rxjs";
import * as THREE from "three";

import { GameObjectAction } from "../action/game-object-action";
import { createPushDetector, PushDetector } from "./index";

/** 平面プッシュ検出生成のパラメータ */
type PlanePushDetectorParam = {
  /** 平面幅 */
  width: number;
  /** 平面高さ */
  height: number;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
  /**
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean;
};

/**
 * 平面プッシュ検出を生成する
 * @param param パラメータ
 * @returns プッシュ検出
 */
export function planePushDetector(param: PlanePushDetectorParam): PushDetector {
  const { width, height, gameObjectAction, visible } = param;
  const geometry = new THREE.PlaneGeometry(width, height);
  return createPushDetector({
    geometry: geometry,
    gameObjectAction,
    visible,
  });
}
