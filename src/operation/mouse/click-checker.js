// @flow
import Rx from "rxjs/Rx";
import * as R from 'ramda';

/** クリック判定に必要なイベントを集めたもの */
type ClickEvent = MouseTouchDown | MouseTouchStart;

/** マウスダウン*/
type MouseTouchDown = {
  type: 'mouseDown',
  isOverlap: boolean
}

/** マウスアップ */
type MouseTouchStart = {
  type: 'mouseUp',
  isOverlap: boolean
}

/** 各種判定のスロットルインターバル */
const THROTTLE_INTERVAL = 300;

/** コンストラクタのパラメータ */
type Param = {
  /** クリックした際のコールバック関数 */
  onClick: () => void,
  /** クリック開始された際のコールバック関数 */
  onClickStart: () => void,
  /** クリックキャンセルされた際のコールバック関数 */
  onClickCancel: () => void
};

/** マウスのクリック判定をする*/
export class ClickChecker {
  _clickEventStream: Rx.Subject;

  constructor(param: Param) {
    this._clickEventStream = new Rx.Subject();

    this._clickEventStream
      .bufferCount(2)
      .filter((eventList: ClickEvent[]) => R.equals(eventList, [
        {type: 'mouseDown', isOverlap: true},
        {type: 'mouseUp', isOverlap: true}
      ]))
      .throttle(() => Rx.Observable.interval(THROTTLE_INTERVAL))
      .subscribe(() => param.onClick());

    this._clickEventStream
      .filter((event: ClickEvent) => R.equals(event, {type: 'mouseDown', isOverlap: true}))
      .throttle(() => Rx.Observable.interval(THROTTLE_INTERVAL))
      .subscribe(() => param.onClickStart());

    this._clickEventStream
      .bufferCount(2)
      .filter((eventList: ClickEvent[]) => R.equals(eventList, [
        {type: 'mouseDown', isOverlap: true},
        {type: 'mouseUp', isOverlap: false}
      ]))
      .throttle(() => Rx.Observable.interval(THROTTLE_INTERVAL))
      .subscribe(() => param.onClickCancel());
  }

  /**
   * マウスがゲーム画面にタッチダウンした際に呼ばれる関数
   *
   * @param isOverlap クリック判定対象とマウスが重なっているか否かのフラグ、trueで重なっている
   */
  onMouseDown(isOverlap: boolean) {
    this._clickEventStream.next({type: 'mouseDown', isOverlap});
  }

  /**
   * マウスがゲーム画面にタッチアップした際に呼ばれる関数
   *
   * @param isOverlap クリック判定対象とマウスが重なっているか否かのフラグ、trueで重なっている
   */
  onMouseUp(isOverlap: boolean) {
    this._clickEventStream.next({type: 'mouseUp', isOverlap});
  };
}