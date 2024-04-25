import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import type { ResourceRoot } from "./resource-root";

/** glTFリソースID */
export type GlTFId = string;

/** glTFリソース設定 */
export type GlTFConfig = {
  /** ID */
  id: GlTFId;

  /** glTFファイルのパス */
  path: string;
};

/** glTFリソース */
export type GlTFResource = {
  /** ID */
  id: GlTFId;

  /** glTFモデル */
  object: THREE.Group;
};

/** IDリスト */
export const GLTF_IDS = {
  SHOPPING_STREET: "SHOPPING_STREET",
};

/** 設定集 */
export const GLTF_CONFIGS: GlTFConfig[] = [
  {
    id: GLTF_IDS.SHOPPING_STREET,
    path: "model/shopping-street/shopping-street.glb",
  },
];

/**
 * GLTFローダー
 *
 * 同じページ内に複数GLTFが存在するとクラッシュすることがあるので、シングルトンにした
 * https://github.com/mrdoob/three.js/issues/22445
 */
const loader = new GLTFLoader();

/**
 * glTFファイルを読み込む
 *
 * @param resourceRoot リソースルート
 * @param config 設定
 * @returns glTFリソース
 */
export function loadGlTF(
  resourceRoot: ResourceRoot,
  config: GlTFConfig,
): Promise<GlTFResource> {
  return new Promise((resolve, reject) => {
    const fullPath = `${resourceRoot.get()}/${config.path}`;

    const onLoad = (gltf: GLTF) =>
      resolve({
        id: config.id,
        object: gltf.scene,
      });

    const onProgress = () => {
      //NOP
    };
    const onFail = (err: unknown) => reject(err);
    loader.load(fullPath, onLoad, onProgress, onFail);
  });
}

/**
 * GLTFリソースを解放する
 *
 * @param target 解放対象
 */
export function disposeGltfModel(target: GlTFResource): void {
  target.object.traverse((v) => {
    if (v instanceof THREE.Mesh) {
      v.geometry.dispose();
      v.material.dispose();

      if (v.material.map instanceof THREE.Texture) {
        v.material.map.dispose();
      }
    }
  });
}
