// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";

/**
 * ランドスケープ警告シーンのビュー
 */
export class PlayInLandscapeView {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._root = document.createElement('div');
    this._root.className = 'play-in-landscape';
    this._root.innerHTML = `
      <span class="play-in-landscape__caption">横向きでプレイしてください</span>
      <img class="play-in-landscape__image" src = "${resourcePath.get()}/waring/play-in-landscape.png"/>
    `;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}