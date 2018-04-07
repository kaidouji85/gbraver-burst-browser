// @flow

import type {TouchRaycastContainer} from "./touch-raycaster";
import type {OverlapTarget} from "../raycaster/overlap-target";

/**
 * 対象オブジェクトに指が重なっているか否かを判定する
 *
 * @param raycasts TouchEventをレイキャスト化したもの
 * @param target 重なり判定をするゲームオブジェクト
 * @return 判定結果、trueで重なっている
 */
export function isTouchOverlap(raycasts: TouchRaycastContainer, target: OverlapTarget): boolean {
  return raycasts.targetTouches
    .map(v => target.isOverlap(v.raycaster))
    .filter(v => v === true)
    .length > 0;
}