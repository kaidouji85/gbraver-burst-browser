// @flow

import * as THREE from 'three';

/**
 * three.jsのオブジェクトにCubeTextureで環境マッピングを適用する
 * 本関数は引数objectを変更するという副作用がある
 *
 * @param object 環境マップイングを適用するオブジェクト
 * @param envMap 環境マップのCubeTexture
 */
export function setCubeTextureInEnvMap(object: typeof THREE.Object3D, envMap: typeof THREE.CubeTexture): void {
  object.traverse((object: typeof THREE.Object3D) => {
    if(object.material && !object.material.isMeshBasicMaterial) {
      object.material.envMap = envMap;
      object.material.needsUpdate = true;
    }
  });
}