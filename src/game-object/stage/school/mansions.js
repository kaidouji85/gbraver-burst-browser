// @flow

import type {Resources} from "../../../resource/resource-manager";
import {MODEL_PATHS} from "../../../resource/resource-manager";
import * as THREE from "three";
import {createMeshFromJson} from "../../../util/mesh/three-json-mesh";

/**
 * マンションを生成して返す
 *
 * @param resources リソース管理クラス
 * @return マンション
 */
export function Mansions(resources: Resources): THREE.Mesh[] {
  const mansion = (x: number, y: number, z: number): THREE.Mesh => {
    let mesh = createMeshFromJson(MODEL_PATHS.MANSION01, resources);
    mesh.position.set(x, y, z);
    mesh.scale.set(0.5, 0.5, 0.5);
    return mesh;
  };

  return [
    mansion(950, 0, 450),
    mansion(950, 0, 0),
    mansion(950, 0, -450),

    mansion(-950, 0, 450),
    mansion(-950, 0, 0),
    mansion(-950, 0, -450),
  ];
}