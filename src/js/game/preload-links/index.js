// @flow

import type {ResourceRoot} from "../../resource/root/resource-root";
import {imageURLs} from "./image-ruls";

/**
 * HTML要素で利用する素材のプリロード
 */
export class PreLoadLinks {
  _links: HTMLElement[];

  /**
   * コンストラクタ
   *
   * @param resourceRoot リソースルート
   */
  constructor(resourceRoot: ResourceRoot) {
    this._links = imageURLs(resourceRoot).map(url => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'image');
      link.setAttribute('href', url);
      return link;
    });
  }

  /**
   * linkタグを取得する
   *
   * @return 取得結果
   */
  getLinks(): HTMLElement [] {
    return this._links;
  }
}