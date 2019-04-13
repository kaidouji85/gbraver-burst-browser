// @flow
import type {Resources} from "../../../resource/index";
import * as THREE from 'three';
import type {GlTFResource} from "../../../resource/gltf";
import {GLTF_IDS} from "../../../resource/gltf";

/** 都市メッシュを生成する */
export function cityMesh(resources: Resources): THREE.Mesh {
  const resource: ?GlTFResource = resources.gltfs.find(v => v.id === GLTF_IDS.CITY);
  const object = resource ? resource.object : new THREE.Mesh();
  object.scale.set(400, 400, 400);
  return object;
}