/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable} from "rxjs";
import type {PushGameStart, PushHowToPlay} from "../../../action/game/title";
import {TitleView} from "./view/title-view";
import {hidden} from "./state/hidden";
import {filter, map} from "rxjs/operators";
import {show} from "./state/show";
import type {ResourcePath} from "../../../resource/path/resource-path";

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

  constructor(resourcePath: ResourcePath) {
    this._state = createInitialState();
    this._view = new TitleView({
      initialState: this._state,
      resourcePath: resourcePath
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

  /**
   * ルートHTML要素を取得する
   *
   * @return {HTMLElement}
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }
}