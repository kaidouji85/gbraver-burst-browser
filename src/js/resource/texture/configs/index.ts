import { TEXTURE_IDS } from "../ids";
import type { TextureConfig } from "../resource";
import { GaiTextureConfigs } from "./gai";
import { GenesisBraverTextureConfigs } from "./genesis-braver";
import { LightningDozerTextureConfigs } from "./lightning-dozer";
import { NeoLandozerTextureConfigs } from "./neo-landozer";
import { RaitoTextureConfigs } from "./raito";
import { ShinBraverTextureConfigs } from "./shin-braver";
import { ShinyaTextureConfigs } from "./sinya";
import { TsubasaTextureConfigs } from "./tsubasa";
import { WingDozerTextureConfigs } from "./wing-dozer";

/** テクスチャ設定をまとめたもの */
export const TEXTURE_CONFIGS: TextureConfig[] = [
  ...ShinBraverTextureConfigs,
  ...NeoLandozerTextureConfigs,
  ...LightningDozerTextureConfigs,
  ...WingDozerTextureConfigs,
  ...GenesisBraverTextureConfigs,
  ...ShinyaTextureConfigs,
  ...GaiTextureConfigs,
  ...RaitoTextureConfigs,
  ...TsubasaTextureConfigs,
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
  }, // バリア関連
  {
    id: TEXTURE_IDS.BARRIER_LIGHTNING,
    path: "barrier/lightning/lightning.webp",
  }, // バッテリー数字
  {
    id: TEXTURE_IDS.BATTERY_NUMBER,
    path: "battery-number/battery-number.webp",
  }, // ダメージ数字
  {
    id: TEXTURE_IDS.DAMAGE_NUMBER,
    path: "damage-indicator/damage-number.webp",
  }, // HPゲージ数字
  {
    id: TEXTURE_IDS.HP_NUMBER,
    path: "gauge/hp-gauge-number.webp",
  }, // バッテリーゲージセレクタ 円盤数字
  {
    id: TEXTURE_IDS.BATTERY_SELECTOR_NUMBER,
    path: "battery-selector/active-number.webp",
  }, // バッテリーセレクタ 円盤数字(ディスアクティブ)
  {
    id: TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER,
    path: "battery-selector/dis-active-number.webp",
  }, // バッテリーセレクタ ボタンに表示する数字
  {
    id: TEXTURE_IDS.BATTERY_CURRENT_VALUE,
    path: "battery-selector/current-battery.webp",
  }, // ターンスタート
  {
    id: TEXTURE_IDS.PLAYER_TURN,
    path: "turn/player-turn.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_TURN,
    path: "turn/enemy-turn.webp",
  }, // 効果ラベル
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
  }, // リザルト
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
  // ゲージ系
  {
    id: TEXTURE_IDS.PLAYER_HP_GAUGE,
    path: "gauge/player-hp-gauge.webp",
  },
  {
    id: TEXTURE_IDS.PLAYER_BATTERY_GAUGE,
    path: "gauge/player-battery-gauge.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_HP_GAUGE,
    path: "gauge/enemy-hp-gauge.webp",
  },
  {
    id: TEXTURE_IDS.ENEMY_BATTERY_GAUGE,
    path: "gauge/enemy-battery-gauge.webp",
  },
  // バッテリーセレクタ系
  {
    id: TEXTURE_IDS.BATTERY_METER_8,
    path: "battery-selector/meter-8.webp",
  },
  {
    id: TEXTURE_IDS.BATTERY_METER_4,
    path: "battery-selector/meter-4.webp",
  },
];

/** 開発中のテクスチャリソース設定をあつめたもの */
export const DEVELOPING_TEXTURE_CONFIGS: TextureConfig[] = [];
