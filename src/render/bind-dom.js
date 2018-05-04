// @flow
import * as THREE from 'three';

/**
 * レンダーとhtmlを結びつける
 *
 * @param renderer レンダラ
 */
export function bindDom(renderer: THREE.WebGLRenderer): void {
  if (!renderer.domElement || !document.body) {
    return;
  }

  document.body.appendChild(renderer.domElement);
}