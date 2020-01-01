// @flow
import * as THREE from 'three';
import {renderPixelRatio} from "./pixel-ratio";
import {getScreenHeight, getScreenWidth} from "../screen-size/screen-size";

/** レンダラを生成する */
export function createRender(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setSize(getScreenWidth(), getScreenHeight());
  const pixelRatio = renderPixelRatio(window.devicePixelRatio);
  renderer.setPixelRatio(pixelRatio);
  return renderer;
}