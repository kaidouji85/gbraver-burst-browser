// @flow
import Rx from "rxjs/Rx";
import type {TouchOverlapState} from "./touch-overlap";

/** タップ判定に関するイベントを集めたもの */
type TapEvent = TouchStart | TouchEnd;

/** タッチスタート */
type TouchStart = {
  type: 'touchStart',
  touchOverlap: TouchOverlapState
};

/** タッチエンド */
type TouchEnd = {
  type: 'touchEnd',
  touchOverlap: TouchOverlapState
};


/** コンストラクタのパラメータ */
type Param = {
  onTap: () => void
};

/** 画面上のオブジェクトをタップしたかを判定する */
export class TapChecker {
  _tapEventStream: Rx.Subject;

  constructor(param: Param) {
    this._tapEventStream = new Rx.Subject();

    this._tapEventStream
      .bufferCount(2)
      .filter((eventList: TapEvent[]) =>
        eventList[0].type === 'touchStart'
        && eventList[0].touchOverlap.touches.filter(v => v.isOverlap).length > 0
        && eventList[1].type === 'touchEnd'
        && eventList[1].touchOverlap.touches.filter(v => v.isOverlap).length === 0
        && eventList[1].touchOverlap.changedTouches.filter(v => v.isOverlap).length > 0
      ).subscribe(() => param.onTap());
  }

  /**
   * ゲーム画面がタッチスタートされた際に呼ばれる関数
   *
   * @param touchOverlap 指とオブジェクトの当たり判定
   */
  onTouchStart(touchOverlap: TouchOverlapState) {
    this._tapEventStream.next({type: 'touchStart', touchOverlap});
  }

  /**
   * ゲーム画面がタッチエンドされた際に呼ばれる関数
   *
   * @param touchOverlap 指とオブジェクトの当たり判定
   */
  onTouchEnd(touchOverlap: TouchOverlapState) {
    this._tapEventStream.next({type: 'touchEnd', touchOverlap});
  }
}