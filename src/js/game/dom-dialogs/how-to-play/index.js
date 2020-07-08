// @flow

import {HowToPlayView} from "./view/how-to-play-view";
import {howToPlayMovieURL} from "../../../how-to-play/how-to-play-movie";
import type {HowToPlayState} from "./state/how-to-play-state";
import {createInitialState} from "./state/initial-state";
import {show} from "./state/show";
import {Observable} from "rxjs";
import type {EndHowToPlay} from "../../../action/game/how-to-play";
import {map} from "rxjs/operators";
import {hidden} from "./state/hidden";
import type {ResourceRoot} from "../../../resource/root/resource-root";

/** イベント通知 */
type Notifier = {
  endHowToPlay: Observable<EndHowToPlay>
};

/**
 * 遊び方ダイアログ
 */
export class HowToPlay {
  _state: HowToPlayState;
  _view: HowToPlayView;
  _notifier: Notifier;

  constructor(resourcePath: ResourceRoot) {
    this._state = createInitialState();

    this._view = new HowToPlayView(howToPlayMovieURL(), resourcePath);
    this._view.engage(this._state);

    this._notifier = {
      endHowToPlay: this._view.notifier().close.pipe(
        map(() => ({type: 'EndHowToPlay'}))
      )
    };
  }

  /**
   * 本ダイアログを表示する
   */
  show(): void {
    this._state = show(this._state);
    this._view.engage(this._state);
  }

  /**
   * 本ダイアログを非表示にする
   */
  hidden(): void {
    this._state = hidden(this._state);
    this._view.engage(this._state);
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return this._notifier;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }
}
