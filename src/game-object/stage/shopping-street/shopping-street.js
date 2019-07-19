// @flow
import type {Resources} from "../../../resource/index";
import * as THREE from 'three';
import type {GlTFResource} from "../../../resource/gltf";
import {GLTF_IDS} from "../../../resource/gltf";
import {CUBE_TEXTURE_IDS} from "../../../resource/cube-texture";

/** 商店街メッシュ */
export function shoppingStreetMesh(resources: Resources): THREE.Mesh {
  const textureResource = resources.cubeTextures.find(v => v.id === CUBE_TEXTURE_IDS.BlueSky);
  const texture: THREE.CubeTexture = textureResource ? textureResource.texture : new THREE.CubeTexture();

  const gltfResource: ?GlTFResource = resources.gltfs
    .find(v => v.id === GLTF_IDS.SHOPPING_STREET);
  const gltf = gltfResource ? gltfResource.object.clone() : new THREE.Mesh();
  gltf.scale.set(100, 100, 100);
  gltf.traverse((object: THREE.Object3D) => {
    if(object.material && !object.material.isMeshBasicMaterial) {
      object.material.envMap = texture;
      object.material.needsUpdate = true;
    }
  });

  return gltf;
}