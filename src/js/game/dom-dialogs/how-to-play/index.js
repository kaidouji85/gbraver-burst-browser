// @flow

import {HowToPlayPresentation} from "./presentation";
import {Observable} from "rxjs";
import type {Resources} from "../../../resource";
import type {DOMDialog} from "../dialog";
import {DefinePlugin} from "../../../webpack/define-plugin";

/** イベント通知 */
type Notifier = {
  endHowToPlay: Observable<void>
};

/**
 * 遊び方ダイアログ
 */
export class HowToPlay implements DOMDialog {
  _presentation: HowToPlayPresentation;
  _notifier: Notifier;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._presentation = new HowToPlayPresentation(resources, DefinePlugin.howToPlay);

    this._notifier = {
      endHowToPlay: this._presentation.notifier().close
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
    return this._presentation.getRootHTMLElement();
  }
}
