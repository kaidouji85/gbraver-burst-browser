// @flow
import type {Resources} from "../../../resource/index";
import * as THREE from 'three';
import type {GlTFResource} from "../../../resource/gltf";
import {GLTF_IDS} from "../../../resource/gltf";

/** 商店街メッシュ */
export function shoppingStreetMesh(resources: Resources): THREE.Mesh {
  const resource: ?GlTFResource = resources.gltfs
    .find(v => v.id === GLTF_IDS.SHOPPING_STREET);
  const object = resource ? resource.object : new THREE.Mesh();
  object.scale.set(200, 200, 200);
  return object;
}