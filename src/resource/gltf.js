// @flow

import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

export type GlTFId = string;

export type GlTFConfig = {
  id: GlTFId,
  path: string,
};

export type GlTFResource = {
  id: GlTFId,
  object: THREE.Object3D
};

export const GLTF_IDS = {
  SCHOOL: 'SCHOOL',
};

export const GLTF_CONFIGS: GlTFConfig[] = [
  {
    id: GLTF_IDS.SCHOOL,
    path: 'model/school/school.glb'
  }
];

export function loadGlTF(basePath: string, config: GlTFConfig): Promise<GlTFResource> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const fullPath = `${basePath}${config.path}`;
    const onLoad = (object) => resolve({
      id: config.id,
      object: object
    });
    const onProgress = () => {}; //NOP
    const onFail = err => reject(err);
    loader.load(fullPath, onLoad, onProgress, onFail);
  });
}

export function loadAllGlTFModel(basePath: string): Promise<GlTFResource[]> {
  return Promise.all(
    GLTF_CONFIGS.map(v => loadGlTF(basePath, v))
  )
}
