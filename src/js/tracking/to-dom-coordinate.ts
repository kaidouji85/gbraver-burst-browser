import * as THREE from "three";

import { DOMCoordinate, TDCoordinate } from "./coordinate";

/**
 * 3Dレイヤー座標をDOMレイヤー座標に変換する
 * @param tdCoordinate 3Dレイヤーの座標
 * @param camera 3Dレイヤーのカメラ
 * @param rendererDOM レンダリング対象のHTML要素
 * @return 変換結果
 */
export function toDOMCoordinate(
  tdCoordinate: TDCoordinate,
  camera: THREE.PerspectiveCamera,
  rendererDOM: HTMLElement,
): DOMCoordinate {
  const origin = new THREE.Vector3(
    tdCoordinate.x,
    tdCoordinate.y,
    tdCoordinate.z,
  );
  origin.project(camera);
  return {
    top: 50 * (origin.y + 1) * rendererDOM.clientHeight,
    left: 50 * (origin.x + 1) * rendererDOM.clientWidth,
  };
}
