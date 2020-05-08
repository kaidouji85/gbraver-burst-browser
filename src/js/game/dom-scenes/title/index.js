/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable} from "rxjs";
import type {PushGameStart, PushHowToPlay} from "../../../action/game/title";
import {TitleView} from "./view/title-view";
import {filter, map} from "rxjs/operators";
import type {ResourcePath} from "../../../resource/path/resource-path";
import type {DOMScene} from "../dom-scene";

/** イベント通知 */
export type Notifier = {
  pushGameStart: Observable<PushGameStart>,
  pushHowToPlay: Observable<PushHowToPlay>,
};

/** タイトルシーン */
export class Title implements DOMScene {
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

  /**
   * ルートHTML要素を取得する
   *
   * @return {HTMLElement}
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }
}