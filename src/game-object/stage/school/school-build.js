// @flow

import type {Resources} from "../../../resource/resource-manager";
import {createMeshFromJson} from "../../../util/mesh/three-json-mesh";
import {MODEL_PATHS} from "../../../resource/resource-manager";

/** 学校メッシュを生成する */
export function createSchoolBuild(resources: Resources): THREE.Mesh {
  const mesh = createMeshFromJson(MODEL_PATHS.SCHOOL, resources);
  mesh.position.z = -200;
  mesh.scale.set(0.4, 0.4, 0.4);
  return mesh;
}