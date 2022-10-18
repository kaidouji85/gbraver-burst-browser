// @flow
import type {Stream, Unsubscriber} from "../stream/stream";
import {getViewPortHeight} from "../view-port/view-port-size";
import type {Resize} from "../window/resize";

/** CSSカムタムプロパティ ビューポート高 */
const VH = '--vh';

/**
 * CSSカムタムプロパティ ビューポート高 の値を更新する
 *
 * @param viewPortHeight 更新する値
 */
function setVH(viewPortHeight: number): void {
  const vh = viewPortHeight * 0.01;
  if(document.documentElement) {
    document.documentElement.style.setProperty(VH, `${vh}px`);
  }
}

/**
 * ビューポート関連のCSSカムタムプロパティを生成する
 * 本モジュールで生成するCSSカムタムプロパティは以下の通りである
 *
 * --vh
 */
export class CssVH {
  /** アンサブスクライバ */
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Stream<Resize>) {
    this._unsubscriber = resize.subscribe(action => {
      this.#onResize(action);
    });
    setVH(getViewPortHeight());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscriber.unsubscribe();
  }

  /**
   * リサイズ時の処理
   *
   * @param action アクション
   */
  #onResize(action: Resize): void {
    setVH(action.height);
  }
}