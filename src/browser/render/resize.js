// @flow

import * as THREE from 'three';

/**
 * WebGLRendererリサイズ時の処理
 * 本関数は引数のレンダラを変更する副作用がある
 *
 * @param renderer レンダラ
 * @param width リサイズ後の画面幅
 * @param height リサイズ後の画面高
 * @param devicePixelRatio デバイスのピクセルレート
 */
export function onWebGLRendererResize(renderer: THREE.WebGLRenderer, width: number, height: number, devicePixelRatio: number): void {
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
}