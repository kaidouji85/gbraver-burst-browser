// @flow

import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import type {ResourcePath} from "./path/resource-path";

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
  object: THREE.Scene
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

// TODO 削除する
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

/**
 * 全てのglTFリソースを読み込む
 *
 * @param resourcePath リソースパス
 * @return 読み込みPromiseの配列
 */
export function loadingAllGTLFModels(resourcePath: ResourcePath): Array<Promise<GlTFResource>> {
  return GLTF_CONFIGS.map(v => loadGlTF(`${resourcePath.get()}/`, v));
}

/**
 * GLTFリソースを解放する
 * 
 * @param target 解放対象
 */
export function disposeGltfModel(target: GlTFResource): void {
  target.object.traverse(v => {
    if (v instanceof THREE.Mesh) {
      v.geometry.dispose();
      v.material.dispose();
      if (v.material.map instanceof THREE.Texture) {
        v.material.map.dispose();
      }
    }
  });
}