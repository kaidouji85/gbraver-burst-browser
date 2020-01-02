// @flow
import * as THREE from 'three';
import {renderPixelRatio} from "./pixel-ratio";
import {getViewPortHeight, getViewPortWidth} from "../view-port/view-port-size";

/** レンダラを生成する */
export function createRender(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setSize(getViewPortWidth(), getViewPortHeight());
  const pixelRatio = renderPixelRatio(window.devicePixelRatio);
  renderer.setPixelRatio(pixelRatio);
  return renderer;
}