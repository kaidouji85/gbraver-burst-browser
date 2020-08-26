// @flow

import * as THREE from 'three';
import {renderPixelRatio} from "./pixel-ratio";

/**
 * WebGLRendererリサイズ時の処理
 * 本関数は引数のレンダラを変更する副作用がある
 *
 * 本関数の引数は全てwindowから取得可能である
 * しかし、利用側にwindowを参照するタイミングを委ねたいので、
 * 引数として受け取る形式にした
 *
 * @param renderer レンダラ
 * @param width リサイズ後の画面幅
 * @param height リサイズ後の画面高
 * @param devicePixelRatio デバイスのピクセルレート
 */
export function onWebGLRendererResize(renderer: typeof THREE.WebGLRenderer, width: number, height: number, devicePixelRatio: number): void {
  renderer.setSize(width, height);
  const pixelRatio = renderPixelRatio(devicePixelRatio);
  renderer.setPixelRatio(pixelRatio);
}