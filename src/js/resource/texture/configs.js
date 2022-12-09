// @flow
import { TEXTURE_IDS } from "./ids";
import type { TextureConfig } from "./resource";

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: TextureConfig[] = [
  // シンブレイバー関連
  {
    id: TEXTURE_IDS.SHIN_BRAVER_STAND,
    path: "armdozer/shin-braver/stand.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_CHARGE,
    path: "armdozer/shin-braver/sp-charge.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_ATTACK,
    path: "armdozer/shin-braver/sp-attack.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_TO_STAND,
    path: "armdozer/shin-braver/sp-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_KNOCK_BACK,
    path: "armdozer/shin-braver/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUARD,
    path: "armdozer/shin-braver/guard.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_DOWN,
    path: "armdozer/shin-braver/down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUTS_UP,
    path: "armdozer/shin-braver/guts-up.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUTS_DOWN,
    path: "armdozer/shin-braver/guts-down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_UP,
    path: "armdozer/shin-braver/burst-up.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN,
    path: "armdozer/shin-braver/burst-down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_CUTIN_UP,
    path: "armdozer/shin-braver/cutin-up.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_CUTIN_DOWN,
    path: "armdozer/shin-braver/cutin-down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BACK_STEP,
    path: "armdozer/shin-braver/back-step.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_FRONT_STEP,
    path: "armdozer/shin-braver/front-step.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_BUTTON_ICON,
    path: "armdozer/shin-braver/burst-button-icon.webp",
  },
  // ネオランドーザ関連
  {
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    path: "armdozer/neo-landozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK,
    path: "armdozer/neo-landozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUARD,
    path: "armdozer/neo-landozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_CHARGE,
    path: "armdozer/neo-landozer/hm-charge.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_ATTACK,
    path: "armdozer/neo-landozer/hm-attack.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_TO_STAND,
    path: "armdozer/neo-landozer/hm-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_DOWN,
    path: "armdozer/neo-landozer/down.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUTS_DOWN,
    path: "armdozer/neo-landozer/guts-down.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUTS_UP,
    path: "armdozer/neo-landozer/guts-up.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_CUTIN_UP,
    path: "armdozer/neo-landozer/cutin-up.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_CUTIN_DOWN,
    path: "armdozer/neo-landozer/cutin-down.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_BACK_STEP,
    path: "armdozer/neo-landozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_FRONT_STEP,
    path: "armdozer/neo-landozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_BURST_BUTTON_ICON,
    path: "armdozer/neo-landozer/burst-button-icon.webp",
  },
  // ライトニングドーザ関連
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_STAND,
    path: "armdozer/lightning-dozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_CHARGE,
    path: "armdozer/lightning-dozer/hm-charge.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_ATTACK,
    path: "armdozer/lightning-dozer/hm-attack.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_TO_STAND,
    path: "armdozer/lightning-dozer/hm-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_KNOCK_BACK,
    path: "armdozer/lightning-dozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_DOWN,
    path: "armdozer/lightning-dozer/down.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_UP,
    path: "armdozer/lightning-dozer/guts-up.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_DOWN,
    path: "armdozer/lightning-dozer/guts-down.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_TO_STAND,
    path: "armdozer/lightning-dozer/guts-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUARD,
    path: "armdozer/lightning-dozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_UP,
    path: "armdozer/lightning-dozer/cutin-up.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_DOWN,
    path: "armdozer/lightning-dozer/cutin-down.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_BACK_STEP,
    path: "armdozer/lightning-dozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_FRONT_STEP,
    path: "armdozer/lightning-dozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_BURST_BUTTON_ICON,
    path: "armdozer/lightning-dozer/burst-button-icon.webp",
  },
  // ウィングドーザ関連
  {
    id: TEXTURE_IDS.WING_DOZER_STAND,
    path: "armdozer/wing-dozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPPER_CHARGE,
    path: "armdozer/wing-dozer/upper-charge.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPPER_ATTACK,
    path: "armdozer/wing-dozer/upper-attack.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPPER_TO_STAND,
    path: "armdozer/wing-dozer/upper-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DASH_UP,
    path: "armdozer/wing-dozer/dash-up.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DASH_DOWN,
    path: "armdozer/wing-dozer/dash-down.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DASH_TO_STAND,
    path: "armdozer/wing-dozer/dash-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_KNOCK_BACK,
    path: "armdozer/wing-dozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DOWN,
    path: "armdozer/wing-dozer/down.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BACK_STEP,
    path: "armdozer/wing-dozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_FRONT_STEP,
    path: "armdozer/wing-dozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BURST_UP,
    path: "armdozer/wing-dozer/burst-up.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BURST_DOWN,
    path: "armdozer/wing-dozer/burst-down.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_GUARD,
    path: "armdozer/wing-dozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BURST_BUTTON_ICON,
    path: "armdozer/wing-dozer/burst-button-icon.webp",
  },
  // シンヤ関連
  {
    id: TEXTURE_IDS.SHINYA_CUTIN,
    path: "pilot/shinya/skill-cutin.webp",
  },
  // ガイ関連
  {
    id: TEXTURE_IDS.GAI_CUTIN,
    path: "pilot/gai/skill-cutin.webp",
  },
  // ライト関連
  {
    id: TEXTURE_IDS.RAITO_CUTIN,
    path: "pilot/raito/skill-cutin.webp",
  },
  // ツバサ関連
  {
    id: TEXTURE_IDS.TSUBASA_CUTIN,
    path: "pilot/tsubasa/skill-cutin.webp",
  },
  // ヒットマーク関連
  {
    id: TEXTURE_IDS.HITMARK_SHOCK_WAVE_LINE,
    path: "hitmark/shock-wave/line.webp",
  },
  {
    id: TEXTURE_IDS.HITMARK_SHOCK_WAVE_RING,
    path: "hitmark/shock-wave/ring.webp",
  },
  {
    id: TEXTURE_IDS.HITMARK_LIGHTNING_RING,
    path: "hitmark/lightning/lightning-ring.webp",
  },
  // バリア関連
  {
    id: TEXTURE_IDS.BARRIER_LIGHTNING,
    path: "barrier/lightning/lightning.webp",
  },
  // バッテリー数字
  {
    id: TEXTURE_IDS.BATTERY_NUMBER,
    path: "battery-number/battery-number.webp",
  },
  // ダメージ数字
  {
    id: TEXTURE_IDS.DAMAGE_NUMBER,
    path: "damage-indicator/damage-number.webp",
  },
  // HPゲージ数字
  {
    id: TEXTURE_IDS.HP_NUMBER,
    path: "gauge/hp-gauge-number.webp",
  },
  // バッテリーゲージセレクタ 円盤数字
  {
    id: TEXTURE_IDS.BATTERY_SELECTOR_NUMBER,
    path: "battery-selector/active-number.webp",
  },
  // バッテリーセレクタ 円盤数字(ディスアクティブ)
  {
    id: TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER,
    path: "battery-selector/dis-active-number.webp",
  },
  // バッテリーセレクタ ボタンに表示する数字
  {
    id: TEXTURE_IDS.BATTERY_CURRENT_VALUE,
    path: "battery-selector/current-battery.webp",
  },
  // ターンスタート
  {
    id: TEXTURE_IDS.PLAYER_TURN,
    path: "turn/player-turn.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_TURN,
    path: "turn/enemy-turn.webp",
  },
  // 効果ラベル
  {
    id: TEXTURE_IDS.POWER_UP,
    path: "effect-label/power-up.webp",
  },
  {
    id: TEXTURE_IDS.REFLECT,
    path: "effect-label/reflect.webp",
  },
  {
    id: TEXTURE_IDS.CONTINUOUS_ATTACK,
    path: "effect-label/continuous-attack.webp",
  },
  {
    id: TEXTURE_IDS.DAMAGE_HALVED,
    path: "effect-label/damage-halved.webp",
  },
  {
    id: TEXTURE_IDS.BATTERY_ENCHANTMENT,
    path: "effect-label/battery-enchantment.webp",
  },
  // リザルト
  {
    id: TEXTURE_IDS.WIN,
    path: "result/win.png",
  },
  {
    id: TEXTURE_IDS.LOSE,
    path: "result/lose.png",
  },
  {
    id: TEXTURE_IDS.DRAW,
    path: "result/draw.png",
  },
];

/** 開発中のテクスチャリソース設定をあつめたもの */
export const DEVELOPING_TEXTURE_CONFIGS: TextureConfig[] = [
  // ジェネシスブレイバー関連
  {
    id: TEXTURE_IDS.GENESIS_BRAVER_STAND,
    path: "armdozer/genesis-braver/stand.webp",
  },
];
