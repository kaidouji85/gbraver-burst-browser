// @flow

import {PlayInLandscapeView} from "./view/play-in-landscape-view";
import type {ResourcePath} from "../../../resource/path/resource-path";

/** ランドスケープ警告シーン */
export class PlayInLandscape {
  _view: PlayInLandscapeView;

  /**
   * コンストラクタ
   *
   * @param dom 本シーンを追加するHTML要素
   * @param resourcePath リソースパス
   */
  constructor(dom: HTMLElement, resourcePath: ResourcePath) {
    this._view = new PlayInLandscapeView(dom, resourcePath);
  }
}