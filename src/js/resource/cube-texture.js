// @flow

import * as THREE from 'three';
import type {ResourceRoot} from "./root/resource-root";

/** キューブテクスチャID */
export type CuteTextureId = string;

/** キューブテクスチャ設定 */
export type CubeTextureConfig = {
  id: CuteTextureId,
  px: string,
  nx: string,
  py: string,
  ny: string,
  pz: string,
  nz: string,
};

/** キューブテクスチャリソース */
export type CubeTextureResource = {
  id: CuteTextureId,
  texture: THREE.CubeTexture,
};

/** キューブテクスチャIDをまとめたもの */
export const CUBE_TEXTURE_IDS = {
  BlueSky: 'BlueSky',
};

/** キューブテクスチャ設定をまとめたもの */
export const CUBE_TEXTURE_CONFIGS: CubeTextureConfig[] = [
  {
    id: CUBE_TEXTURE_IDS.BlueSky,
    px: 'sky-box/blue-sky/px.png',
    nx: 'sky-box/blue-sky/nx.png',
    py: 'sky-box/blue-sky/py.png',
    ny: 'sky-box/blue-sky/ny.png',
    pz: 'sky-box/blue-sky/pz.png',
    nz: 'sky-box/blue-sky/nz.png',
  }
];

/**
 * キューブテクスチャを読み込み
 *
 * @param resourceRoot リソースルート
 * @param config キューブテクスチャ設定
 * @return キューブテクスチャリソース
 */
export function loadCubeTexture(resourceRoot: ResourceRoot, config: CubeTextureConfig): Promise<CubeTextureResource> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.CubeTextureLoader();
    loader.load(
      [
        `${resourceRoot.get()}/${config.px}`,
        `${resourceRoot.get()}/${config.nx}`,
        `${resourceRoot.get()}/${config.py}`,
        `${resourceRoot.get()}/${config.ny}`,
        `${resourceRoot.get()}/${config.pz}`,
        `${resourceRoot.get()}/${config.nz}`,
      ],
      (texture: THREE.CubeTexture) => {
        resolve({
          id: config.id,
          texture: texture
        });
      },
      () => {
        // NOP
      },
      (e) => {
        reject(e);
      }
    );
  });
}

/**
 * キューブテクスチャを全て読み込む
 *
 * @param resourceRoot リソースルート
 * @return 読み込み結果
 */
export function loadingAllCubeTextures(resourceRoot: ResourceRoot): Array<Promise<CubeTextureResource>> {
  return CUBE_TEXTURE_CONFIGS.map(v => loadCubeTexture(resourceRoot, v));
}