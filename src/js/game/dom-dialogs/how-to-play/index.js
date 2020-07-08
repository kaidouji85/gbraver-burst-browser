// @flow

import {HowToPlayView} from "./view/how-to-play-view";
import {howToPlayMovieURL} from "../../../how-to-play/how-to-play-movie";
import type {HowToPlayState} from "./state/how-to-play-state";
import {createInitialState} from "./state/initial-state";
import {Observable} from "rxjs";
import type {EndHowToPlay} from "../../../action/game/how-to-play";
import {map} from "rxjs/operators";
import type {Resources} from "../../../resource";
import type {DOMDialog} from "../dialog";

/** イベント通知 */
type Notifier = {
  endHowToPlay: Observable<EndHowToPlay>
};

/**
 * 遊び方ダイアログ
 */
export class HowToPlay implements DOMDialog {
  _state: HowToPlayState;
  _view: HowToPlayView;
  _notifier: Notifier;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._state = createInitialState();

    this._view = new HowToPlayView(resources, howToPlayMovieURL());
    this._view.engage(this._state);

    this._notifier = {
      endHowToPlay: this._view.notifier().close.pipe(
        map(() => ({type: 'EndHowToPlay'}))
      )
    };
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
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
