// @flow

import {waitFinishAnimation} from "../../wait/wait-finish-animation";

/**
 * HTML要素で作られたフェーダ
 */
export class DOMFader {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = 'dom-fader landscape-only';
  }

  /**
   * ルートのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * フェードイン
   *
   * @return アニメーション
   */
  async fadeIn(): Promise<void> {
    const animation = this._root.animate([
      {opacity: 1},
      {opacity: 0}
    ], {
      duration: 500,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }

  /**
   * フェードアウト
   *
   * @return アニメーション
   */
  async fadeOut(): Promise<void> {
    const animation = this._root.animate([
      {opacity: 0},
      {opacity: 1}
    ], {
      duration: 500,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }
}
