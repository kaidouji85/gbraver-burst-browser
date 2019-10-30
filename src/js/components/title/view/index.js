// @flow

import {render} from 'react-dom';
import {TitlePresentation} from "./presentation";
import type {TitleState} from "../state/title-state";
import {Observable, Subject} from "rxjs";

/** イベント通知 */
type Notifier = {
  touch: Observable<void>
};

/** タイトルのビュー */
export class TitleView {
  _dom: HTMLElement;
  _touch: Subject<void>;

  constructor(dom: HTMLElement) {
    this._dom = dom;
    this._touch = new Subject();
  }

  /**
   * 状態をビューに反映させる
   *
   * @param state モデル
   */
  engage(state: TitleState): void {
    render(TitlePresentation({
      onTouch: () => {
        this._touch.next();
      },
      isVisible: state.isVisible
    }), this._dom);
  }

  notifier(): Notifier {
    return {
      touch: this._touch
    };
  }
}