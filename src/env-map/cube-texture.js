// @flow

import * as THREE from 'three';
import {CubeTexture} from "three";

/**
 * three.jsのオブジェクトにCubeTextureで環境マッピングを適用する
 * 本関数は引数objectを変更するという副作用がある
 *
 * @param object 環境マップイングを適用するオブジェクト
 * @param envMap 環境マップのCubeTexture
 */
export function setCubeTextureInEnvMap(object: THREE.Object3D, envMap: CubeTexture): void {
  object.traverse((object: THREE.Object3D) => {
    if(object.material && !object.material.isMeshBasicMaterial) {
      object.material.envMap = envMap;
      object.material.needsUpdate = true;
    }
  });
}