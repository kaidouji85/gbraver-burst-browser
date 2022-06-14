// @flow

import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";

/**
 * ランドスケープ警告 プレゼンテーション
 */
export class PlayInLandscapePresentation {
  #root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const playInLandscapeResource = resources.paths.find(v => v.id === PathIds.PLAY_IN_LANDSCAPE);
    const playInLandscapePath = playInLandscapeResource
      ? playInLandscapeResource.path
      : '';

    this.#root = document.createElement('div');
    this.#root.className = 'play-in-landscape';
    this.#root.innerHTML = `
      <span class="play-in-landscape__caption">横向きでプレイしてください</span>
      <img class="play-in-landscape__image" src = "${playInLandscapePath}"/>
    `;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}