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
  SHIN_BRAVER_PUNCH: 'SHIN_BRAVER_PUNCH',
  NEO_LANDOZER_STAND: 'NEO_LANDOZER_STAND',
  BLUE_SKY_FRONT: 'BLUE_SKY_FRONT',
  BLUE_SKY_RIGHT: 'BLUE_SKY_RIGHT',
  BLUE_SKY_BACK: 'BLUE_SKY_BACK',
  BLUE_SKY_LEFT: 'BLUE_SKY_LEFT',
  BLUE_SKY_UP: 'BLUE_SKY_UP',
  BLUE_SKY_DOWN: 'BLUE_SKY_DOWN',
};

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: {[string]: TextureConfig} = {
  // シンブレイバー関連
  SHIN_BRAVER_STAND: {
    id: TEXTURE_IDS.SHIN_BRAVER_STAND,
    path: 'armdozer/shin-braver/stand.png'
  },
  SHIN_BRAVER_PUNCH: {
    id: TEXTURE_IDS.SHIN_BRAVER_PUNCH,
    path: 'armdozer/shin-braver/punch.png'
  },

  // ネオランドーザ関連
  NEO_LANDOZER_STAND: {
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    path: 'armdozer/neo-landozer/stand.png'
  },

  // 青空スカイボックス関連
  BLUE_SKY_FRONT: {
    id: TEXTURE_IDS.BLUE_SKY_FRONT,
    path: 'sky-box/blue-sky/front.png',
  },
  BLUE_SKY_RIGHT: {
    id: TEXTURE_IDS.BLUE_SKY_RIGHT,
    path: 'sky-box/blue-sky/right.png',
  },
  BLUE_SKY_BACK: {
    id: TEXTURE_IDS.BLUE_SKY_BACK,
    path: 'sky-box/blue-sky/back.png'
  },
  BLUE_SKY_LEFT: {
    id: TEXTURE_IDS.BLUE_SKY_LEFT,
    path: 'sky-box/blue-sky/left.png'
  },
  BLUE_SKY_UP: {
    id: TEXTURE_IDS.BLUE_SKY_UP,
    path: 'sky-box/blue-sky/up.png'
  },
  BLUE_SKY_DOWN: {
    id: TEXTURE_IDS.BLUE_SKY_DOWN,
    path: 'sky-box/blue-sky/down.png'
  }
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
