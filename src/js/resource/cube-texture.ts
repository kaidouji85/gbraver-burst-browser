import * as THREE from "three";

import type { ResourceRoot } from "./resource-root";

/** キューブテクスチャID */
export type CuteTextureId = string;

/** キューブテクスチャ設定 */
export type CubeTextureConfig = {
  id: CuteTextureId;
  px: string;
  nx: string;
  py: string;
  ny: string;
  pz: string;
  nz: string;
};

/** キューブテクスチャリソース */
export type CubeTextureResource = {
  id: CuteTextureId;
  texture: THREE.CubeTexture;
};

/** キューブテクスチャIDをまとめたもの */
export const CUBE_TEXTURE_IDS = {
  BlueSky: "BlueSky",
};

/** キューブテクスチャ設定をまとめたもの */
export const CUBE_TEXTURE_CONFIGS: CubeTextureConfig[] = [
  {
    id: CUBE_TEXTURE_IDS.BlueSky,
    px: "sky-box/blue-sky/px.webp",
    nx: "sky-box/blue-sky/nx.webp",
    py: "sky-box/blue-sky/py.webp",
    ny: "sky-box/blue-sky/ny.webp",
    pz: "sky-box/blue-sky/pz.webp",
    nz: "sky-box/blue-sky/nz.webp",
  },
];

/**
 * キューブテクスチャを読み込み
 *
 * @param resourceRoot リソースルート
 * @param config キューブテクスチャ設定
 * @returns キューブテクスチャリソース
 */
export function loadCubeTexture(
  resourceRoot: ResourceRoot,
  config: CubeTextureConfig,
): Promise<CubeTextureResource> {
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
        texture.colorSpace = THREE.LinearSRGBColorSpace;
        resolve({
          id: config.id,
          texture: texture,
        });
      },
      () => {
        // NOP
      },
      (e) => {
        reject(e);
      },
    );
  });
}
