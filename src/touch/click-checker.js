// @flow
import Rx from "rxjs/Rx";
import * as R from 'ramda';

/**
 * イベントタイプ
 * ここではクリック判定に関係するイベントのみを定義している
 */
type EventType = 'empty' | 'touchDown' | 'touchUp';

/** イベント */
type Event = {
  /** イベントタイプ */
  type: EventType,
  /** クリック判定対象と指、マウスが重なっているか否かのフラグ、trueで重なっている */
  isOverlap: boolean
};

/** クリック判定をするクラス */
export class ClickChecker {
  /**
   * イベント実行履歴
   * touchDown、touchUpイベントを履歴を保存する
   * 判定に必要な、直近2件のみを残す
   */
  _touchEventList: Rx.BehaviorSubject;

  constructor(onClick: () => void) {
    const EMPTY_EVENT: Event = {type: 'empty', isOverlap: false};
    const CLICK_EVENT_LIST: Event[] = [
      {type: 'touchDown', isOverlap: true},
      {type: 'touchUp', isOverlap: true}
    ];

    this._touchEventList = new Rx.BehaviorSubject([EMPTY_EVENT, EMPTY_EVENT]);
    this._touchEventList
      .scan((acc: Event[], x: Event) => [...acc, x].slice(-2))
      .subscribe(eventList => {
        const isClick = R.equals(eventList, CLICK_EVENT_LIST);
        if (isClick) {
          onClick();
        }
      });
  }

  /**
   * マウス、指がゲーム画面にタッチダウンした際に呼ばれる関数
   *
   * @param isOverlap クリック判定対象と指、マウスが重なっているか否かのフラグ、trueで重なっている
   */
  onTouchDown(isOverlap: boolean) {
    this._touchEventList.next({type: 'touchDown', isOverlap});
  }

  /**
   * マウス、指がゲーム画面にタッチアップした際に呼ばれる関数
   *
   * @param isOverlap クリック判定対象と指、マウスが重なっているか否かのフラグ、trueで重なっている
   */
  onTouchUp(isOverlap: boolean) {
    this._touchEventList.next({type: 'touchUp', isOverlap});
  };
}