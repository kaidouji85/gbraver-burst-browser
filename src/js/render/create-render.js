// @flow
import * as THREE from 'three';
import {renderPixelRatio} from "./pixel-ratio";

/** レンダラを生成する */
export function createRender(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = renderPixelRatio(window.devicePixelRatio);
  renderer.setPixelRatio(pixelRatio);
  return renderer;
}