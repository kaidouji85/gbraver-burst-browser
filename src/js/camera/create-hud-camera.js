// @flow
import * as THREE from 'three';
import {getViewPortHeight, getViewPortWidth} from "../view-port/view-port-size";

/** HUDレイヤーのカメラを生成して返す */
export function createHUDCamera(): typeof THREE.OrthographicCamera {
  const width = getViewPortWidth();
  const height = getViewPortHeight();
  return new THREE.OrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    0,
    30
  );
}