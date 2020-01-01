// @flow
import * as THREE from 'three';
import {renderPixelRatio} from "./pixel-ratio";
import {getHeight, getWidth} from "../screen-size/screen-size";

/** レンダラを生成する */
export function createRender(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setSize(getWidth(), getHeight());
  const pixelRatio = renderPixelRatio(window.devicePixelRatio);
  renderer.setPixelRatio(pixelRatio);
  return renderer;
}