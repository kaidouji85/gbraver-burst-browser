/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable} from "rxjs";
import type {PushGameStart, PushHowToPlay} from "../../../action/game/title";
import {TitleView} from "./view/title-view";
import {hidden} from "./state/hidden";
import {filter, map} from "rxjs/operators";
import {show} from "./state/show";

/** イベント通知 */
export type Notifier = {
  pushGameStart: Observable<PushGameStart>,
  pushHowToPlay: Observable<PushHowToPlay>,
};

/** タイトルシーン */
export class Title {
  _state: TitleState;
  _view: TitleView;
  _notifier: Notifier;

  constructor(dom: HTMLElement) {
    this._state = createInitialState();
    this._view = new TitleView({
      dom: dom,
      initialState: this._state,
    });

    this._notifier = {
      pushGameStart: this._view.notifier().gameStart.pipe(
        filter(() => this._state.canOperation),
        map(() => ({
          type: 'PushGameStart'
        }))
      ),
      pushHowToPlay: this._view.notifier().howToPlay.pipe(
        filter(() => this._state.canOperation),
        map(() => ({
          type: 'PushHowToPlay',
        }))
      )
    };
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return this._notifier;
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
}