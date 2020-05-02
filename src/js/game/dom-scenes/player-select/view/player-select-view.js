// @flow

import type {PlayerSelectState} from "../state/player-select-state";
import type {ResourcePath} from "../../../../resource/path/resource-path";

/**
 * プレイヤーセレクト ビュー
 */
export class PlayerSelectView {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._root = document.createElement('div');
    this._root.className = 'player-select';
    this._root.innerHTML = `
      プレイヤーセレクト
      <img class="player-select__armdozer" src="${resourcePath.get()}/armdozer/shin-braver/stand.png">
    `;
  }

  /**
   * ステートをビューに反映させる
   *
   * @param state ステート
   */
  engage(state: PlayerSelectState): void {
    // NOP
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}
