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
  SHIN_BRAVER_DOWN: 'SHIN_BRAVER_DOWN',
  SHIN_BRAVER_GUTS_UP: 'SHIN_BRAVER_GUTS_UP',
  SHIN_BRAVER_GUTS_DOWN: 'SHIN_BRAVER_GUTS_DOWN',
  NEO_LANDOZER_STAND: 'NEO_LANDOZER_STAND',
  NEO_LANDOZER_KNOCK_BACK: 'NEO_LANDOZER_KNOCK_BACK',
  NEO_LANDOZER_GUARD: 'NEO_LANDOZER_GUARD',
  NEO_LANDOZER_HM_CHARGE: 'NEO_LANDOZER_HM_CHARGE',
  NEO_LANDOZER_HM_ATTACK: 'NEO_LANDOZER_HM_ATTACK',
  NEO_LANDOZER_HM_TO_STAND: 'NEO_LANDOZER_HM_TO_STAND',
  NEO_LANDOZER_DOWN: 'NEO_LANDOZER_DOWN',
  NEO_LANDOZER_GUTS_UP: 'NEO_LANDOZER_GUTS_UP',
  NEO_LANDOZER_GUTS_DOWN: 'NEO_LANDOZER_GUTS_DOWN',
  HITMARK_SPARK: 'HITMARK_SPARK',
  BATTERY_NUMBER: 'BATTERY_NUMBER',
  DAMAGE_NUMBER: 'DAMAGE_NUMBER',
  HP_NUMBER: 'HP_NUMBER',
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
  {
    id: TEXTURE_IDS.SHIN_BRAVER_DOWN,
    path: 'armdozer/shin-braver/down.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUTS_UP,
    path: 'armdozer/shin-braver/guts-up.png'
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUTS_DOWN,
    path: 'armdozer/shin-braver/guts-down.png'
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
  {
    id: TEXTURE_IDS.NEO_LANDOZER_DOWN,
    path: 'armdozer/neo-landozer/down.png',
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUTS_DOWN,
    path: 'armdozer/neo-landozer/guts-down.png',
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUTS_UP,
    path: 'armdozer/neo-landozer/guts-up.png',
  },
  // ヒットマーク関連
  {
    id: TEXTURE_IDS.HITMARK_SPARK,
    path: 'hitmark/spark.png'
  },
  // バッテリー数字
  {
    id: TEXTURE_IDS.BATTERY_NUMBER,
    path: 'battery-number/battery-number.png'
  },
  // ダメージ数字
  {
    id: TEXTURE_IDS.DAMAGE_NUMBER,
    path: 'damage-indicator/damage-number.png'
  },
  // HPゲージ数字
  {
    id: TEXTURE_IDS.HP_NUMBER,
    path: 'gauge/hp-gauge-number.png'
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
  return new Promise((resolve, reject) => {
    loader.load(
      `${basePath}${config.path}`,
      texture => resolve({
        id: config.id,
        texture
      }),
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
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