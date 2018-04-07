// @flow

import type {MouseRaycaster} from "./mouse-raycaster";
import {OverlapTarget} from "../raycaster/overlap-target";

/**
 * マウスと対象物が重なっているかを判定する
 *
 * @param mouse マウスのレイキャスト
 * @param target 重なり判定をするオブジェクト
 * @return 判定結果、trueで重なっている
 */
export function isMouseOverlap(mouse: MouseRaycaster, target: OverlapTarget): boolean {
  return target.isOverlap(mouse.raycaster);
}