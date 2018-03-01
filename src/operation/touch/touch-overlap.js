// @flow

import type {TouchEventRaycaster, TouchRaycaster} from "./touch-raycaster";
import type {TouchTarget} from "./touch-target";

/**
 * 指とオブジェクトの当たり判定結果
 * 本オブジェクトはTouchEventのレイアウトを参考にしている
 */
export type TouchEventOverlap = {
  changedTouches: TouchOverlap[],
  targetTouches: TouchOverlap[],
  touches: TouchOverlap[],
};

/** 単位タッチとオブジェクトの当たり判定結果 */
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