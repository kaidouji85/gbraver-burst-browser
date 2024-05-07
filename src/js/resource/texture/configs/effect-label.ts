import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** エフェクトラベルのテクスチャ設定をあつめたもの */
export const EffectLabelTextureConfigs: TextureConfig[] = [
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
    id: TEXTURE_IDS.BATTERY_ENHANCEMENT,
    path: "effect-label/battery-enhancement.webp",
  },
];
