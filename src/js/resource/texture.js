// @flow
import * as THREE from "three";
import type {ResourcePath} from "./path/resource-path";

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
  SHIN_BRAVER_BURST_UP: 'SHIN_BRAVER_BURST_UP',
  SHIN_BRAVER_BURST_DOWN: 'SHIN_BRAVER_BURST_DOWN',
  SHIN_BRAVER_CUTIN_UP: 'SHIN_BRAVER_CUTIN_UP',
  SHIN_BRAVER_CUTIN_DOWN: 'SHIN_BRAVER_CUTIN_DOWN',
  SHIN_BRAVER_BACK_STEP: 'SHIN_BRAVER_BACK_STEP',
  SHIN_BRAVER_FRONT_STEP: 'SHIN_BRAVER_FRONT_STEP',
  NEO_LANDOZER_STAND: 'NEO_LANDOZER_STAND',
  NEO_LANDOZER_KNOCK_BACK: 'NEO_LANDOZER_KNOCK_BACK',
  NEO_LANDOZER_GUARD: 'NEO_LANDOZER_GUARD',
  NEO_LANDOZER_HM_CHARGE: 'NEO_LANDOZER_HM_CHARGE',
  NEO_LANDOZER_HM_ATTACK: 'NEO_LANDOZER_HM_ATTACK',
  NEO_LANDOZER_HM_TO_STAND: 'NEO_LANDOZER_HM_TO_STAND',
  NEO_LANDOZER_DOWN: 'NEO_LANDOZER_DOWN',
  NEO_LANDOZER_GUTS_UP: 'NEO_LANDOZER_GUTS_UP',
  NEO_LANDOZER_GUTS_DOWN: 'NEO_LANDOZER_GUTS_DOWN',
  NEO_LANDOZER_CUTIN_UP: 'NEO_LANDOZER_CUTIN_UP',
  NEO_LANDOZER_CUTIN_DOWN: 'NEO_LANDOZER_CUTIN_DOWN',
  NEO_LANDOZER_BACK_STEP: 'NEO_LANDOZER_BACK_STEP',
  NEO_LANDOZER_FRONT_STEP: 'NEO_LANDOZER_FRONT_STEP',
  LIGHTNING_DOZER_STAND: 'LIGHTNING_DOZER_STAND',
  LIGHTNING_DOZER_HM_CHARGE: 'LIGHTNING_DOZER_HM_CHARGE',
  LIGHTNING_DOZER_HM_ATTACK: 'LIGHTNING_DOZER_HM_ATTACK',
  LIGHTNING_DOZER_HM_TO_STAND: 'LIGHTNING_DOZER_HM_TO_STAND',
  LIGHTNING_DOZER_KNOCK_BACK: 'LIGHTNING_DOZER_KNOCK_BACK',
  LIGHTNING_DOZER_DOWN: 'LIGHTNING_DOZER_DOWN',
  LIGHTNING_DOZER_GUTS_UP: 'LIGHTNING_DOZER_GUTS_UP',
  LIGHTNING_DOZER_GUTS_DOWN: 'LIGHTNING_DOZER_GUTS_DOWN',
  LIGHTNING_DOZER_GUTS_TO_STAND: 'LIGHTNING_DOZER_GUTS_TO_STAND',
  LIGHTNING_DOZER_GUARD: 'LIGHTNING_DOZER_GUARD',
  LIGHTNING_DOZER_CUTIN_UP: 'LIGHTNING_DOZER_CUTIN_UP',
  LIGHTNING_DOZER_CUTIN_DOWN: 'LIGHTNING_DOZER_CUTIN_DOWN',
  LIGHTNING_DOZER_BACK_STEP: 'LIGHTNING_DOZER_BACK_STEP',
  LIGHTNING_DOZER_FRONT_STEP: 'LIGHTNING_DOZER_FRONT_STEP',
  HITMARK_SHOCK_WAVE_LINE: 'HITMARK_SHOCK_WAVE_LINE',
  HITMARK_SHOCK_WAVE_RING: 'HITMARK_SHOCK_WAVE_RING',
  HITMARK_LIGHTNING_RING: 'HITMARK_LIGHTNING_RING',
  BARRIER_LIGHTNING: 'BARRIER_LIGHTNING',
  BATTERY_NUMBER: 'BATTERY_NUMBER',
  DAMAGE_NUMBER: 'DAMAGE_NUMBER',
  HP_NUMBER: 'HP_NUMBER',
  PLAYER_TURN: 'PLAYER_TURN',
  ENEMY_TURN: 'ENEMY_TURN',
  POWER_UP: 'POWER_UP',
  REFLECT: 'REFLECT',
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
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_UP,
    path: 'armdozer/shin-braver/burst-up.png',
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN,
    path: 'armdozer/shin-braver/burst-down.png',
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_CUTIN_UP,
    path: 'armdozer/shin-braver/cutin-up.png',
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_CUTIN_DOWN,
    path: 'armdozer/shin-braver/cutin-down.png',
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BACK_STEP,
    path: 'armdozer/shin-braver/back-step.png',
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_FRONT_STEP,
    path: 'armdozer/shin-braver/front-step.png',
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
  {
    id: TEXTURE_IDS.NEO_LANDOZER_CUTIN_UP,
    path: 'armdozer/neo-landozer/cutin-up.png',
  },
  {
    id:TEXTURE_IDS.NEO_LANDOZER_CUTIN_DOWN,
    path: 'armdozer/neo-landozer/cutin-down.png'
  },
  {
    id:TEXTURE_IDS.NEO_LANDOZER_BACK_STEP,
    path: 'armdozer/neo-landozer/back-step.png'
  },
  {
    id:TEXTURE_IDS.NEO_LANDOZER_FRONT_STEP,
    path: 'armdozer/neo-landozer/front-step.png'
  },
  // ライトニングドーザ関連
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_STAND,
    path: 'armdozer/lightning-dozer/stand.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_CHARGE,
    path: 'armdozer/lightning-dozer/hm-charge.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_ATTACK,
    path: 'armdozer/lightning-dozer/hm-attack.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_TO_STAND,
    path: 'armdozer/lightning-dozer/hm-to-stand.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_KNOCK_BACK,
    path: 'armdozer/lightning-dozer/knock-back.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_DOWN,
    path: 'armdozer/lightning-dozer/down.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_UP,
    path: 'armdozer/lightning-dozer/guts-up.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_DOWN,
    path: 'armdozer/lightning-dozer/guts-down.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_TO_STAND,
    path: 'armdozer/lightning-dozer/guts-to-stand.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUARD,
    path: 'armdozer/lightning-dozer/guard.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_UP,
    path: 'armdozer/lightning-dozer/cutin-up.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_DOWN,
    path: 'armdozer/lightning-dozer/cutin-down.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_BACK_STEP,
    path: 'armdozer/lightning-dozer/back-step.png',
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_FRONT_STEP,
    path: 'armdozer/lightning-dozer/front-step.png',
  },
  // ヒットマーク関連
  {
    id: TEXTURE_IDS.HITMARK_SHOCK_WAVE_LINE,
    path: 'hitmark/shock-wave/line.png',
  },
  {
    id: TEXTURE_IDS.HITMARK_SHOCK_WAVE_RING,
    path: 'hitmark/shock-wave/ring.png',
  },
  {
    id: TEXTURE_IDS.HITMARK_LIGHTNING_RING,
    path: 'hitmark/lightning/lightning-ring.png',
  },
  // バリア関連
  {
    id: TEXTURE_IDS.BARRIER_LIGHTNING,
    path: 'barrier/lightning/lightning.png',
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
  },
  // ターンスタート
  {
    id: TEXTURE_IDS.PLAYER_TURN,
    path: 'turn/player-turn.png',
  },
  {
    id: TEXTURE_IDS.ENEMY_TURN,
    path: 'turn/enemy-turn.png',
  },
  // 効果ラベル
  {
    id: TEXTURE_IDS.POWER_UP,
    path: 'effect-label/power-up.png',
  },
  {
    id: TEXTURE_IDS.REFLECT,
    path: 'effect-label/reflect.png',
  },
];

/**
 * テクスチャを読み込む
 *
 * @param resourcePath リソースパス
 * @param config テクスチャ設定
 * @return 読み込み結果
 */
export function loadTexture(resourcePath: ResourcePath, config: TextureConfig): Promise<TextureResource> {
  let loader = new THREE.TextureLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      `${resourcePath.get()}/${config.path}`,
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
 * @param resourcePath リソースパス
 * @returns 読み込み結果
 */
export function loadingAllTextures(resourcePath: ResourcePath): Array<Promise<TextureResource>> {
  return TEXTURE_CONFIGS.map(v => loadTexture(resourcePath, v));
}
