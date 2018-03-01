// @flow
import Rx from "rxjs/Rx";
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
  onTap: () => void
};

/** 画面上のオブジェクトをタップしたかを判定する */
export class TapChecker {
  _tapEventStream: Rx.Subject;

  constructor(param: Param) {
    this._tapEventStream = new Rx.Subject();

    const isOverlap = (touchOverlap: TouchEventOverlap): boolean => {
      return touchOverlap.touches.filter(v => v.isOverlap).length > 0;

    };
    const noOverlap = (touchOverlap: TouchEventOverlap): boolean => {
      return touchOverlap.touches.filter(v => v.isOverlap).length === 0
        && touchOverlap.changedTouches.filter(v => v.isOverlap).length > 0;
    };

    this._tapEventStream
      .bufferCount(2)
      .filter((v: TapEvent[]) => v[0].type === 'touchStart')
      .filter((v: TapEvent[]) => isOverlap(v[0].touchOverlap))
      .filter((v: TapEvent[]) => v[1].type === 'touchEnd')
      .filter((v: TapEvent[]) => noOverlap(v[1].touchOverlap))
      .subscribe(() => param.onTap());
  }

  /**
   * ゲーム画面がタッチスタートされた際に呼ばれる関数
   *
   * @param touchOverlap 指とオブジェクトの当たり判定
   */
  onTouchStart(touchOverlap: TouchEventOverlap) {
    this._tapEventStream.next({type: 'touchStart', touchOverlap});
  }

  /**
   * ゲーム画面がタッチエンドされた際に呼ばれる関数
   *
   * @param touchOverlap 指とオブジェクトの当たり判定
   */
  onTouchEnd(touchOverlap: TouchEventOverlap) {
    this._tapEventStream.next({type: 'touchEnd', touchOverlap});
  }
}