// @flow

import type {ResourcePath} from "../../resource/path/resource-path";

/**
 * HTML要素で利用する素材のプリロード
 */
export class DOMPreload {
  _links: HTMLElement[];

  constructor(resourcePath: ResourcePath) {
    const imageURLs = [
      `${resourcePath.get()}/armdozer/shin-braver/player-select.png`,
      `${resourcePath.get()}/armdozer/neo-landozer/player-select.png`,
      `${resourcePath.get()}/armdozer/ligjtning-dozer/player-select.png`,
    ];
    this._links = imageURLs.map(url => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'image');
      link.setAttribute('href', url);
      return link;
    });
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getLinks(): HTMLElement [] {
    return this._links;
  }
}