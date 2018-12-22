// @flow
import type {Resources} from "../../../resource/index";
import * as THREE from 'three';
import type {GlTFResource} from "../../../resource/gltf";
import {GLTF_IDS} from "../../../resource/gltf";

/** 学校メッシュを生成する */
export function createSchoolBuild(resources: Resources): THREE.Mesh {
  const resource: ?GlTFResource = resources.gltfs.find(v => v.id === GLTF_IDS.SCHOOL);
  const object = resource ? resource.object : new THREE.Mesh();

  object.scale.set(300, 300, 300);
  object.position.z = -200;
  return object;
}