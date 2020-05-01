// @flow

import type {ResourcePath} from "../../../resource/path/resource-path";

/**
 * プレイヤーセレクト
 */
export class PlayerSelect {
  /**
   * コンストラクタ
   *
   * @param dom 本シーンを追加するHTML要素
   * @param resourcePath リソースパス
   */
  constructor(dom: HTMLElement, resourcePath: ResourcePath) {
    dom.innerHTML = `
      <div class="player-select">
        プレイヤーセレクト
        <img class="player-select__armdozer" src="${resourcePath.get()}/armdozer/shin-braver/stand.png">
      </div>
    `;
  }
}
