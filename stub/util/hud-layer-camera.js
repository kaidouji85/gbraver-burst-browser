// @flow
import * as THREE from "three";

/** HUDレイヤー用カメラを生成する */
export function hudLayerCamera(): THREE.OrthographicCamera {
  return new THREE.OrthographicCamera(
    -window.innerWidth/2,
    window.innerWidth/2,
    window.innerHeight/2,
    -window.innerHeight/2,
    0,
    30
  )
}