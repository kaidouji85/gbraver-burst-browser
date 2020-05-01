// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";

/**
 * ランドスケープ警告シーンのビュー
 */
export class PlayInLandscapeView {
  /**
   * コンストラクタ
   *
   * @param dom 本要素を追加するHTML要素
   * @param resourcePath リソースパス
   */
  constructor(dom :HTMLElement, resourcePath: ResourcePath) {
    dom.innerHTML = `
      <div class="play-in-landscape">
        <span class="play-in-landscape__caption">横向きでプレイしてください</span>
        <img class="play-in-landscape__image" src = "${resourcePath.get()}/waring/play-in-landscape.png"/>
      </div>
    `;
  }
}