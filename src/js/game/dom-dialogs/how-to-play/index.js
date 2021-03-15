// @flow

import {HowToPlayPresentation} from "./presentation";
import type {Resources} from "../../../resource";
import type {DOMDialog} from "../dialog";
import {DefinePlugin} from "../../../webpack/define-plugin";
import type {Stream} from "../../../stream/core";

/**
 * 遊び方ダイアログ
 */
export class HowToPlay implements DOMDialog {
  _presentation: HowToPlayPresentation;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._presentation = new HowToPlayPresentation(resources, DefinePlugin.howToPlay);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * ダイアログ閉じ通知
   *
   * @return 通知ストリーム
   */
  closeNotifier(): Stream<void> {
    return this._presentation.closeNotifier();
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
