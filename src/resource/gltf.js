// @flow

import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

/** glTFリソースID */
export type GlTFId = string;

/** glTFリソース設定 */
export type GlTFConfig = {
  /** ID */
  id: GlTFId,
  /** glTFファイルのパス */
  path: string,
};

/** glTFリソース */
export type GlTFResource = {
  /** ID */
  id: GlTFId,
  /** glTFモデル */
  object: THREE.Object3D
};

/** IDリスト */
export const GLTF_IDS = {
  SHOPPING_STREET: 'SHOPPING_STREET',
};

/** 設定集 */
export const GLTF_CONFIGS: GlTFConfig[] = [
  {
    id: GLTF_IDS.SHOPPING_STREET,
    path: 'model/shopping-street.glb'
  }
];

/**
 * glTFファイルを読み込む
 *
 * @param basePath ベースとなるパス
 * @param config 設定
 * @return glTFリソース
 */
export function loadGlTF(basePath: string, config: GlTFConfig): Promise<GlTFResource> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const fullPath = `${basePath}${config.path}`;
    const onLoad = (object) => resolve({
      id: config.id,
      object: object.scene
    });
    const onProgress = () => {}; //NOP
    const onFail = err => reject(err);
    loader.load(fullPath, onLoad, onProgress, onFail);
  });
}

/**
 * 全てのglTFリソースを読み込む
 *
 * @param basePath ベースとなるパス
 * @return glTFリソース
 */
export function loadAllGlTFModel(basePath: string): Promise<GlTFResource[]> {
  return Promise.all(
    GLTF_CONFIGS.map(v => loadGlTF(basePath, v))
  )
}
