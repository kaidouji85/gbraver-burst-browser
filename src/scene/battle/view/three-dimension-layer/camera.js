// @flow

import * as THREE from "three";

/** カメラを生成する */
export function createCamera() {
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 900;
  camera.position.y = 450;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  return camera;
}
