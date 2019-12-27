// @flow
import * as THREE from 'three';

/** レンダラを生成する */
export function createRender(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  return renderer;
}