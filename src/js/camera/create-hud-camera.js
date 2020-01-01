// @flow
import * as THREE from 'three';
import {getScreenHeight, getScreenWidth} from "../screen-size/screen-size";

/** HUDレイヤーのカメラを生成して返す */
export function createHUDCamera(): THREE {
  const width = getScreenWidth();
  const height = getScreenHeight();
  return new THREE.OrthographicCamera(
    -width / 2,
    width / 2,
    height / 2,
    -height / 2,
    0,
    30
  );
}