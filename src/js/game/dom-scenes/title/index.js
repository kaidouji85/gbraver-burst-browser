/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable} from "rxjs";
import type {EndTitle} from "../../../action/game/end-title";
import {onTouch} from "./state/on-touch";
import {TitleView} from "./view/title-view";
import {tap, map, filter} from "rxjs/operators";

/** イベント通知 */
export type Notifier = {
  endTitle: Observable<EndTitle>  //TODO 削除する
};

/** タイトルシーン */
export class Title {
  _state: TitleState;
  _view: TitleView;
  _endTitle: Observable<EndTitle>;

  constructor(dom: HTMLElement) {
    this._state = createInitialState();
    this._view = new TitleView({
      dom: dom,
      initialState: this._state,
    });

    this._endTitle = this._view.notifier().gameStart.pipe(
      filter(() => this._state.canOperation),
      tap(() => {
        this._state = onTouch(this._state);
        this._view.engage(this._state);
      }),
      map(() => (
        {type: 'EndTitle'}
      ))
    );
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return {
      endTitle: this._endTitle
    };
  }
}