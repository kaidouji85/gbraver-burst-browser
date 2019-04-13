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
  SHIN_BRAVER_SP_CHARGE: 'SHIN_BRAVER_SP_CHARGE',
  SHIN_BRAVER_SP_ATTACK: 'SHIN_BRAVER_SP_ATTACK',
  SHIN_BRAVER_SP_TO_STAND: 'SHIN_BRAVER_SP_TO_STAND',
  SHIN_BRAVER_KNOCK_BACK: 'SHIN_BRAVER_KNOCK_BACK',
  SHIN_BRAVER_GUARD: 'SHIN_BRAVER_GUARD',
  NEO_LANDOZER_STAND: 'NEO_LANDOZER_STAND',
  NEO_LANDOZER_KNOCK_BACK: 'NEO_LANDOZER_KNOCK_BACK',
  NEO_LANDOZER_GUARD: 'NEO_LANDOZER_GUARD',
  NEO_LANDOZER_HM_CHARGE: 'NEO_LANDOZER_HM_CHARGE',
  NEO_LANDOZER_HM_ATTACK: 'NEO_LANDOZER_HM_ATTACK',
  NEO_LANDOZER_HM_TO_STAND: 'NEO_LANDOZER_HM_TO_STAND',
  BLUE_SKY_FRONT: 'BLUE_SKY_FRONT',
  BLUE_SKY_RIGHT: 'BLUE_SKY_RIGHT',
  BLUE_SKY_BACK: 'BLUE_SKY_BACK',
  BLUE_SKY_LEFT: 'BLUE_SKY_LEFT',
  BLUE_SKY_UP: 'BLUE_SKY_UP',
  BLUE_SKY_DOWN: 'BLUE_SKY_DOWN',
  TILE_MAP_SCHOOL_GROUND: 'TILE_MAP_SCHOOL_GROUND',
  HITMARK_SPARK: 'HITMARK_SPARK',
};

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: TextureConfig[] = [
  // シンブレイバー関連
  {
    id: TEXTURE_IDS.SHIN_BRAVER_STAND,
    path: 'armdozer/shin-braver/stand.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_CHARGE,
    path: 'armdozer/shin-braver/sp-charge.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_ATTACK,
    path: 'armdozer/shin-braver/sp-attack.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_TO_STAND,
    path: 'armdozer/shin-braver/sp-to-stand.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_KNOCK_BACK,
    path: 'armdozer/shin-braver/knock-back.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUARD,
    path: 'armdozer/shin-braver/guard.png'
  },
  // ネオランドーザ関連
  {
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    path: 'armdozer/neo-landozer/stand.png'
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK,
    path: 'armdozer/neo-landozer/knock-back.png'
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUARD,
    path: 'armdozer/neo-landozer/guard.png'
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_CHARGE,
    path: 'armdozer/neo-landozer/hm-charge.png'
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_ATTACK,
    path: 'armdozer/neo-landozer/hm-attack.png'
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_TO_STAND,
    path: 'armdozer/neo-landozer/hm-to-stand.png'
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

  // ヒットマーク関連
  {
    id: TEXTURE_IDS.HITMARK_SPARK,
    path: 'hitmark/spark.png'
  },
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