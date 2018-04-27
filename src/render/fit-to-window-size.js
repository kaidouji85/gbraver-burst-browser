// @flow
import * as THREE from 'three';

/**
 * レンダラサイズをウインドウサイズに合わせる
 * 本関数には副作用がある
 *
 * @param render レンダラ
 */
export function fitToWindowSize(render: THREE.WebGLRenderer) {
  render.setSize(window.innerWidth, window.innerHeight);
}