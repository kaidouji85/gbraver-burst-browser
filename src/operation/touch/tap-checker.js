// @flow

import type {TouchEventOverlap} from "./touch-overlap";

/** タップ判定に関するイベントを集めたもの */
type TapEvent = TouchStart | TouchEnd;

/** タッチスタート */
type TouchStart = {
  type: 'touchStart',
  touchOverlap: TouchEventOverlap
};

/** タッチエンド */
type TouchEnd = {
  type: 'touchEnd',
  touchOverlap: TouchEventOverlap
};


/** コンストラクタのパラメータ */
type Param = {
  onClick: () => void
};

/** 画面上のオブジェクトをタップしたかを判定する */
export class TapChecker {
  constructor(param: Param) {

  }

  onTouchStart() {

  }

  onTouchEnd() {

  }
}