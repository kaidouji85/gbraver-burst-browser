// @flow

import {getViewPortHeight} from "./view-port-size";
import type {Resize} from "../action/resize/resize";
import {Observable, Subscription} from "rxjs";
import {createResizeStream} from "../action/resize/resize";

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

export class CssVH {
  _resize: Observable<Resize>;
  _subscription: Subscription;

  constructor() {
    this._resize = createResizeStream();
    this._subscription = this._resize.subscribe(action => {
      this._onResize(action);
    });

    setVH();
  }

  destructor(): void {
    this._subscription.unsubscribe();
  }

  _onResize(action: Resize): void {
    setVH();
  }
}