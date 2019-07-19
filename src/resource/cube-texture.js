// @flow

import * as THREE from 'three';

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
    px: 'sky-box/blue-sky/left.png',
    nx: 'sky-box/blue-sky/right.png',
    py: 'sky-box/blue-sky/up.png',
    ny: 'sky-box/blue-sky/down.png',
    pz: 'sky-box/blue-sky/front.png',
    nz: 'sky-box/blue-sky/back.png',
  }
];

/**
 * キューブテクスチャを読み込み
 *
 * @param basePath resourceフォルダのベースとなるURL
 * @param config キューブテクスチャ設定
 * @return キューブテクスチャリソース
 */
export function loadCubeTexture(basePath: string, config: CubeTextureConfig): Promise<CubeTextureResource> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.CubeTextureLoader();
    loader.load(
      [
        `${basePath}/${config.px}`,
        `${basePath}/${config.nx}`,
        `${basePath}/${config.py}`,
        `${basePath}/${config.ny}`,
        `${basePath}/${config.pz}`,
        `${basePath}/${config.nz}`,
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
 * @param basePath resourceフォルダのベースとなるURL
 * @return {Promise<$TupleMap<Array<Promise<CubeTextureResource>>, typeof $await>>}
 */
export function loadAllCubeTexture(basePath: string): Promise<CubeTextureResource[]> {
  return Promise.all(CUBE_TEXTURE_CONFIGS.map(v => loadCubeTexture(basePath, v)));
}