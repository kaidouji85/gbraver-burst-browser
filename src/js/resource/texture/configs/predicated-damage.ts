import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ダメージ予測のテクスチャ設定をあつめたもの */
export const PredicatedDamageTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.PREDICATED_DAMAGE_NUMBER,
    path: "gauge/predicated-damage-number.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
