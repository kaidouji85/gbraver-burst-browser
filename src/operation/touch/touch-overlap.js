// @flow

import type {TouchRaycastContainer, TouchRaycaster} from "./touch-raycaster";
import type {TouchTarget} from "./touch-target";

/**
 * タッチとオブジェクトの当たり判定結果を集めたもの
 */
export type TouchOverlapContainer = {
  /** 前回のタッチと今回のタッチで接触状況が変化したもの */
  changedTouches: TouchOverlap[],
  /** 現在ゲーム画面に接触している全てのタッチ */
  targetTouches: TouchOverlap[],
  /** 現在のウインドウに接触している全てのタッチ */
  touches: TouchOverlap[],
};

/** タッチとオブジェクトの当たり判定結果 */
export type TouchOverlap = {
  /** タッチごとに割り当てられるユニークID */
  identifier: number,
  /** タッチが当たり判定対象と重なっているか否かの判定結果、trueで重なっている */
  isOverlap: boolean,
};

/**
 * タッチイベントレイキャストからターゲットとの当たり判定をとる
 *
 * @param touchRaycaster タッチイベントから生成した例キャスター
 * @param target タッチ対象のターゲット
 * @return タッチイベントレイキャストからターゲットとの当たり判定
 */
export function createTouchEventOverlap(touchRaycaster: TouchRaycastContainer, target: TouchTarget): TouchOverlapContainer {
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