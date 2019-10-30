/// @flow

import {TitleView} from "./view";
import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable, Subject, Subscription} from "rxjs";
import type {EndTitle} from "../../action/game/end-title";
import {onTouch} from "./state/on-touch";

/** イベント通知 */
export type Notifier = {
  endTitle: Observable<EndTitle>
};

/** タイトルシーン */
export class Title {
  _state: TitleState;
  _view: TitleView;
  _endTitle: Subject<EndTitle>;
  _subscription: Subscription;

  constructor(dom: HTMLElement) {
    this._state = createInitialState();

    this._view = new TitleView(dom);
    this._view.engage(this._state);

    this._endTitle = new Subject();

    this._subscription = this._view.notifier().touch.subscribe(() => {
      this._onTouch();
    });
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return {
      endTitle: this._endTitle
    };
  }

  /** 画面タッチ時のイベント */
  _onTouch(): void {
    if (!this._state.canOperation) {
      return;
    }

    this._state = onTouch(this._state);
    this._view.engage(this._state);
    this._endTitle.next({type: 'EndTitle'});
  }
}