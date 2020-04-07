// @flow

import * as THREE from "three";

/** 座標 */
export type Coordinate = {
  x: number,
  y: number,
  z: number
};

/**
 * 3Dレイヤー座標をHUDレイヤー座標に変換する
 *
 * @param tdCoordinate 3Dレイヤーの座標
 * @param camera 3Dレイヤーのカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @return 変換結果
 */
export function toHUDCoordinate(tdCoordinate: Coordinate, camera: THREE.PerspectiveCamera, rendererDOM: HTMLElement): Coordinate {
  const origin = new THREE.Vector3(tdCoordinate.x, tdCoordinate.y, tdCoordinate.z);
  origin.project(camera);
  return {
    x: origin.x * rendererDOM.clientWidth / 2,
    y: origin.y * rendererDOM.clientHeight / 2,
    z: origin.z
  };
}