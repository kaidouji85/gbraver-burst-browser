// @flow
import * as THREE from "three";

/** テクスチャID */
export type TextureId = string;

/** テクスチャ設定 */
export type TextureConfig = {
  id: TextureId,
  path: string
};

/** テクスチャリソース */
export type TextureResource = {
  id: TextureId,
  texture: THREE.Texture
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
  TILE_MAP_SCHOOL_GROUND: 'TILE_MAP_SCHOOL_GROUND',
  ATTACK_BUTTON: 'ATTACK_BUTTON',
  DEFENSE_BUTTON: 'DEFENSE_BUTTON',
  BURST_BUTTON: 'BURST_BUTTON',
  OK_BUTTON: 'OK_BUTTON',
};

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: TextureConfig[] = [
  // シンブレイバー関連
  {
    id: TEXTURE_IDS.SHIN_BRAVER_STAND,
    path: 'armdozer/shin-braver/stand.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_PUNCH,
    path: 'armdozer/shin-braver/punch.png'
  },

  // ネオランドーザ関連
  {
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    path: 'armdozer/neo-landozer/stand.png'
  },

  // 青空スカイボックス関連
  {
    id: TEXTURE_IDS.BLUE_SKY_FRONT,
    path: 'sky-box/blue-sky/front.png',
  },
  {
    id: TEXTURE_IDS.BLUE_SKY_RIGHT,
    path: 'sky-box/blue-sky/right.png',
  },
  {
    id: TEXTURE_IDS.BLUE_SKY_BACK,
    path: 'sky-box/blue-sky/back.png'
  },
  {
    id: TEXTURE_IDS.BLUE_SKY_LEFT,
    path: 'sky-box/blue-sky/left.png'
  },
  {
    id: TEXTURE_IDS.BLUE_SKY_UP,
    path: 'sky-box/blue-sky/up.png'
  },
  {
    id: TEXTURE_IDS.BLUE_SKY_DOWN,
    path: 'sky-box/blue-sky/down.png'
  },

  // 学校 タイルマップ
  {
    id: TEXTURE_IDS.TILE_MAP_SCHOOL_GROUND,
    path: 'tile-map/school-ground/map.png'
  },

  // コウゲキボタン
  {
    id: TEXTURE_IDS.ATTACK_BUTTON,
    path: 'button/attack-button.png'
  },

  // ボウギョボタン
  {
    id: TEXTURE_IDS.DEFENSE_BUTTON,
    path: 'button/defense-button.png'
  },

  // バーストボタン
  {
    id: TEXTURE_IDS.BURST_BUTTON,
    path: 'button/burst-button.png'
  },

  // ケッテイボタン
  {
    id: TEXTURE_IDS.OK_BUTTON,
    path: 'button/ok-button.png'
  }
];

/**
 * テクスチャを読み込む
 *
 * @param basePath ベースとなるパス
 * @param config テクスチャ設定
 * @return 読み込み結果
 */
export function loadTexture(basePath: string, config: TextureConfig): Promise<TextureResource> {
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
export async function loadAllTexture(basePath: string): Promise<TextureResource[]> {
  return await Promise.all(TEXTURE_CONFIGS.map(v => loadTexture(basePath, v)));
}