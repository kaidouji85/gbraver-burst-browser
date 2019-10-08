// @flow
import * as THREE from 'three';

/** HUDレイヤーのカメラを生成して返す */
export function createHUDCamera(): THREE {
  return new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    0,
    30
  );
}