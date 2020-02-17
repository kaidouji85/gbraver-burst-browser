/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable, Subscription} from "rxjs";
import type {EndTitle} from "../../../action/game/end-title";
import {TitleView} from "./view/title-view";
import {hidden} from "./state/hidden";
import {filter, map} from "rxjs/operators";
import {show} from "./state/show";
import {howToPlayMovieURL} from "../../../how-to-play/how-to-play-movie";
import {openWindow} from "../../../window/open-window";

/** イベント通知 */
export type Notifier = {
  endTitle: Observable<EndTitle>
};

/** タイトルシーン */
export class Title {
  _state: TitleState;
  _view: TitleView;
  _endTitle: Observable<EndTitle>;
  _subscriptions: Subscription[];

  constructor(dom: HTMLElement) {
    this._state = createInitialState();
    this._view = new TitleView({
      dom: dom,
      initialState: this._state,
    });

    this._endTitle = this._view.notifier().gameStart.pipe(
      filter(() => this._state.canOperation),
      map(() => ({
        type: 'EndTitle',
        button: 'GameStart'
      }))
    );

    this._subscriptions = [
      this._view.notifier().howToPlay.subscribe(() => {
        this._onHowToPlayClick();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return {
      endTitle: this._endTitle
    };
  }

  /** 本シーンを表示する */
  show(): void {
    this._state = show(this._state);
    this._view.engage(this._state);
  }

  /** 本シーンを非表示にする */
  hidden(): void {
    this._state = hidden(this._state);
    this._view.engage(this._state);
  }

  /**
   * 遊び方がクリックされた際のイベント
   */
  _onHowToPlayClick(): void {
    if (!this._state.canOperation) {
      return;
    }

    const url = howToPlayMovieURL();
    openWindow(url);
  }
}