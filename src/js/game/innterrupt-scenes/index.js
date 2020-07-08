// @flow

import {PlayInLandscape} from "./play-in-landscape";
import type {Resources} from "../../resource";

/**
 * 割り込みで表示されるシーンをあつめたもの
 */
export class InterruptScenes {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
  }

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    // NOP
  }

  /**
   * 割り込みシーンをルート要素に関連づける
   *
   * @param resources リソース管理オブジェクト
   */
  bind(resources: Resources): void {
    const playInLandscape = new PlayInLandscape(resources.rootPath);
    this._root.appendChild(playInLandscape.getRootHTMLElement());
  }

  /**
   * 本クラスに含まれるルートHTML要素を返す
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}