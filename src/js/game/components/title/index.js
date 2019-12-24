/// @flow

import {render} from 'react-dom';
import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable, Subject} from "rxjs";
import type {EndTitle} from "../../../action/game/end-title";
import {onTouch} from "./state/on-touch";
import {titleView} from "./view/title-view";

/** イベント通知 */
export type Notifier = {
  endTitle: Observable<EndTitle>
};

/** タイトルシーン */
export class Title {
  _dom: HTMLElement;
  _state: TitleState;
  _endTitle: Subject<EndTitle>;

  constructor(dom: HTMLElement) {
    this._dom = dom;
    this._state = createInitialState();
    this._endTitle = new Subject();

    this._engage();
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return {
      endTitle: this._endTitle
    };
  }

  /** ステートをビューに反映させる */
  _engage(): void {
    const component = titleView({
      state: this._state,
      onTouch: this._onTouch.bind(this)
    });
    render(component, this._dom);
  }

  /** 画面タッチ時のイベント */
  _onTouch(): void {
    if (!this._state.canOperation) {
      return;
    }

    this._state = onTouch(this._state);
    this._engage();
    this._endTitle.next({type: 'EndTitle'});
  }
}