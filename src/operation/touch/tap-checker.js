// @flow
import Rx from "rxjs/Rx";
import type {TouchOverlapContainer} from "./touch-overlap";

/** タップ判定に関するイベントを集めたもの */
type TapEvent = TouchStart | TouchEnd;

/** タッチスタート */
type TouchStart = {
  type: 'touchStart',
  touchOverlap: TouchOverlapContainer
};

/** タッチエンド */
type TouchEnd = {
  type: 'touchEnd',
  touchOverlap: TouchOverlapContainer
};

/** コンストラクタのパラメータ */
type Param = {
  /** 対象がタップされた際のコールバック関数 */
  onTap: () => void,
  /** 対象がタップ開始された際のコールバック関数 */
  onTapStart: () => void,
  /** 対象がタップキャンセルされた際のコールバック関数 */
  onTapCancel: () => void
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
        && eventList[0].touchOverlap.targetTouches.filter(v => v.isOverlap).length > 0
        && eventList[1].type === 'touchEnd'
        && eventList[1].touchOverlap.targetTouches.filter(v => v.isOverlap).length === 0
        && eventList[1].touchOverlap.changedTouches.filter(v => v.isOverlap).length > 0
      ).subscribe(() => param.onTap());

    this._tapEventStream
      .filter((event: TapEvent) =>
        event.type === 'touchStart'
        && event.touchOverlap.targetTouches.filter(v => v.isOverlap).length > 0
      ).subscribe(() => param.onTapStart());

    this._tapEventStream
      .bufferCount(2)
      .filter((eventList: TapEvent[]) =>
        eventList[0].type === 'touchStart'
        && eventList[0].touchOverlap.targetTouches.filter(v => v.isOverlap).length > 0
        && eventList[1].type === 'touchEnd'
        && eventList[1].touchOverlap.targetTouches.filter(v => v.isOverlap).length === 0
        && eventList[1].touchOverlap.changedTouches.filter(v => v.isOverlap).length === 0
      ).subscribe(() => param.onTapCancel());
  }

  /**
   * ゲーム画面がタッチスタートされた際に呼ばれる関数
   *
   * @param touchOverlap 指とオブジェクトの当たり判定
   */
  onTouchStart(touchOverlap: TouchOverlapContainer) {
    this._tapEventStream.next({type: 'touchStart', touchOverlap});
  }

  /**
   * ゲーム画面がタッチエンドされた際に呼ばれる関数
   *
   * @param touchOverlap 指とオブジェクトの当たり判定
   */
  onTouchEnd(touchOverlap: TouchOverlapContainer) {
    this._tapEventStream.next({type: 'touchEnd', touchOverlap});
  }
}