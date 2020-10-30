// @flow

import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import {waitFinishAnimation} from "../../../../wait/wait-finish-animation";

/**
 * cssクラス名のプレフィックス
 */
export const CLASS_NAME_PREFIX = 'player-select__armdozer-bust-shot';

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShot {
  _image: HTMLImageElement;
  _isLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param path 画像パス
   * @param className cssクラス名
   */
  constructor(path: string, className: string) {
    this._image = document.createElement('img');
    this._image.src = path;
    this._image.className = className;
    this._isLoaded = waitElementLoaded(this._image);
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._image;
  }

  /**
   * 読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._isLoaded;
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this._image.style.opacity = '0';
  }

  /**
   * 表示する
   */
  show(): void {
    this._image.style.opacity = '1';
  }

  /**
   * アニメーションさせる
   *
   * @return アニメーション
   */
  move(): Promise<void> {
    const animation = this._image.animate([
      {transform: 'translateX(5em)'},
      {transform: 'translateX(0)'},
    ], {
      duration: 200,
      fill: "forwards",
      easing: 'ease'
    });
    return waitFinishAnimation(animation);
  }
}

