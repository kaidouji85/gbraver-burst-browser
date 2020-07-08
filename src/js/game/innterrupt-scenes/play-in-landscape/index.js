// @flow

import {PlayInLandscapeView} from "./view/play-in-landscape-view";
import type {ResourceRoot} from "../../../resource/root/resource-root";

/** ランドスケープ警告シーン */
export class PlayInLandscape {
  _view: PlayInLandscapeView;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourceRoot) {
    this._view = new PlayInLandscapeView(resourcePath);
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