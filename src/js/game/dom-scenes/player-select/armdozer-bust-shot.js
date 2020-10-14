// @flow

import type {Resources} from "../../../resource";

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShot {
  _root: HTMLImageElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._root = document.createElement('img');
    this._root.className = 'player-select__working__armdozer';
    this._root.src = `${resources.rootPath.get()}/armdozer/shin-braver/bust-shot.png`;
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
