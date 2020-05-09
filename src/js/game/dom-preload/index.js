// @flow

import type {ResourcePath} from "../../resource/path/resource-path";

/**
 * HTML要素で利用する素材のプリロード
 */
export class DOMPreload {
  _root: HTMLElement;

  constructor(resourcePath: ResourcePath) {
    this._root = document.createElement('div');
    this._root.className = 'dom-preload';

    const imageURLs = [
      `${resourcePath.get()}/armdozer/shin-braver/player-select.png`,
      `${resourcePath.get()}/armdozer/neo-landozer/player-select.png`,
      `${resourcePath.get()}/armdozer/ligjtning-dozer/player-select.png`,
    ];
    const images = imageURLs.map(url => {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'dom-preload__image';
      return img;
    });
    images.forEach(img => {
      this._root.appendChild(img);
    })

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