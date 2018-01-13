// @flow
import * as THREE from "three";
import * as R from "ramda";

/** テクスチャID */
export type TextureId = string;

/** テクスチャ管理 */
export type TextureManager = {
  id: TextureId,
  texture: THREE.Texture
};

/** テクスチャ設定 */
export type TextureConfig = {
  id: TextureId,
  path: string
};

/** テクスチャIDをまとめたもの */
export const TEXTURE_IDS = {
  SHIN_BRAVER_STAND: 'SHIN_BRAVER_STAND',
};

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: {[string]: TextureConfig} = {
  SHIN_BRAVER_STAND: {
    id: TEXTURE_IDS.SHIN_BRAVER_STAND,
    path: 'armdozer/shin-braver/stand.png'
  },
};

/**
 * テクスチャを読み込む
 *
 * @param basePath ベースとなるパス
 * @param config テクスチャ設定
 * @return 読み込み結果
 */
export function loadTexture(basePath: string, config: TextureConfig): Promise<TextureManager> {
  let loader = new THREE.TextureLoader();
  return new Promise(resolve => loader.load(`${basePath}${config.path}`, texture => resolve({
    id: config.id,
    texture
  })));
}

/**
 * ゲームで使う全てのテクスチャを読み込む
 *
 * @param basePath ベースとなるパス
 * @returns 読み込み結果
 */
export async function loadAllTexture(basePath: string): Promise<TextureManager[]> {
  const configs: TextureConfig[] = R.values(TEXTURE_CONFIGS);
  return await Promise.all(configs.map(v => loadTexture(basePath, v)));
}
