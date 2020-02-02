// @flow

import {resourceBasePath} from "../../../../resource/resource-base-path";

/**
 * ランドスケープ警告シーンのビュー
 */
export class PlayInLandscapeView {
  constructor(dom :HTMLElement) {
    dom.innerHTML = `
      <div class="play-in-landscape">
        <span class="play-in-landscape__caption">横向きでプレイしてください</span>
        <img class="play-in-landscape__image" src = "${resourceBasePath()}/waring/play-in-landscape.png"/>
      </div>
    `;
  }
}