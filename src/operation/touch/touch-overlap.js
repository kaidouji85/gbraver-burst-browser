// @flow

import type {TouchEventRaycaster, TouchRaycaster} from "./touch-raycaster";
import type {TouchTarget} from "./touch-target";

/** タッチイベントレイキャストから生成した、オブジェクトとの当たり判定 */
export type TouchEventOverlap = {
  changedTouches: TouchOverlap[],
  targetTouches: TouchOverlap[],
  touches: TouchOverlap[],
};

/** 単位タッチの当たり判定 */
export type TouchOverlap = {
  identifier: number,
  isOverlap: boolean,
};

/**
 * タッチイベントレイキャストからターゲットとの当たり判定をとる
 *
 * @param touchRaycaster タッチイベントから生成した例キャスター
 * @param target タッチ対象のターゲット
 * @return タッチイベントレイキャストからターゲットとの当たり判定
 */
export function createTouchEventOverlap(touchRaycaster: TouchEventRaycaster, target: TouchTarget): TouchEventOverlap {
  const createTouchOverlap = (touchRaycaster: TouchRaycaster): TouchOverlap => ({
    identifier: touchRaycaster.identifier,
    isOverlap: target.isOverlap(touchRaycaster.raycaster)
  });

  return {
    changedTouches: touchRaycaster.changedTouches.map(createTouchOverlap),
    targetTouches: touchRaycaster.targetTouches.map(createTouchOverlap),
    touches: touchRaycaster.touches.map(createTouchOverlap),
  };
}