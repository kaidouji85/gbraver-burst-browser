import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** 電撃攻撃のテクスチャ設定をまとめたもの */
export const LightingTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.HITMARK_LIGHTNING_RING,
    path: "hitmark/lightning/lightning-ring.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
