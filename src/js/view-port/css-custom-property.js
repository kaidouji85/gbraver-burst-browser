// @flow

import {getViewPortHeight} from "./view-port-size";

/**
 * ビューポート関連のCSSカムタムプロパティを生成する
 * 本モジュールで生成するCSSカムタムプロパティは以下の通りである
 *
 * --vh
 */

/** CSSカムタムプロパティ ビューポート高 */
export const VH = '--vh';

/** CSSカムタムプロパティ ビューポート高 の値を再計算する */
export function setVH(): void {
  const vh = getViewPortHeight() * 0.01;
  if(document.documentElement) {
    document.documentElement.style.setProperty(VH, `${vh}px`);
  }
}
