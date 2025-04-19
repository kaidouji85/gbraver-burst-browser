import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ダメージ数字のテクスチャ設定をあつめたもの */
export const DamageNumberTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.DAMAGE_NUMBER,
    path: "damage-indicator/damage-number.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
