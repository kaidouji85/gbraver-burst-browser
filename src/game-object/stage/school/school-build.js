// @flow
import type {Resources} from "../../../resource/resource-manager";
import {createMeshFromJson} from "../../../util/mesh/three-json-mesh";
import * as THREE from 'three';
import type {JsonModelManager} from "../../../resource/json-model";
import {JSON_MODEL_IDS} from "../../../resource/json-model";

/** 学校メッシュを生成する */
export function createSchoolBuild(resources: Resources): THREE.Mesh {
  const jsonModelManager: ?JsonModelManager = resources.models.find(v => v.id === JSON_MODEL_IDS.SCHOOL);
  const mesh = jsonModelManager ? createMeshFromJson(jsonModelManager) : new THREE.Mesh();

  mesh.position.z = -200;
  mesh.scale.set(0.3, 0.3, 0.3);
  return mesh;
}