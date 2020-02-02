/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {merge, Observable} from "rxjs";
import type {EndTitle} from "../../../action/game/end-title";
import {TitleView} from "./view/title-view";
import {hidden} from "./state/hidden";
import {filter, map} from "rxjs/operators";

/** イベント通知 */
export type Notifier = {
  endTitle: Observable<EndTitle>
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

    this._endTitle = merge(
      this._view.notifier().gameStart.pipe(
        filter(() => this._state.canOperation),
        map(() => ({
          type: 'EndTitle',
          button: 'GameStart'
        }))
      ),

      this._view.notifier().howToPlay.pipe(
        filter(() => this._state.canOperation),
        map(() => ({
          type: 'EndTitle',
          button: 'HowToPlay'
        }))
      )
    );
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return {
      endTitle: this._endTitle
    };
  }

  /** 本シーンを非表示にする */
  hidden(): void {
    this._state = hidden(this._state);
    this._view.engage(this._state);
  }
}