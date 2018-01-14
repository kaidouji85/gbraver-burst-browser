// @flow
import * as THREE from "three";
import type {JsonModelResource} from "../../resource/json-model";

/**
 * JSONモデルからメッシュを生成する
 *
 * @param jsonModelManager JSONモデル管理オブジェクト
 * @return 生成したメッシュ
 */
export function createMeshFromJson(jsonModelManager: JsonModelResource): THREE.Mesh {
  const material = new THREE.MeshFaceMaterial(jsonModelManager.material);
  return new THREE.Mesh(jsonModelManager.geometry, material);
}