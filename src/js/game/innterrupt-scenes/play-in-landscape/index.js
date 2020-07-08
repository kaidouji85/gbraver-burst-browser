// @flow

import {PlayInLandscapeView} from "./view/play-in-landscape-view";
import type {Resources} from "../../../resource";

/** ランドスケープ警告シーン */
export class PlayInLandscape {
  _view: PlayInLandscapeView;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._view = new PlayInLandscapeView(resources);
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