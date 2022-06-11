// @flow

import type {Resources} from "../../../resource";
import {PlayInLandscapePresentation} from "./presentation";

/**
 * ランドスケープ警告
 */
export class PlayInLandscape {
  _presentation: PlayInLandscapePresentation;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._presentation = new PlayInLandscapePresentation(resources);
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