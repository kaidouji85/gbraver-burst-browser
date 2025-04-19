import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** 電撃バリアのテクスチャ設定をまとめたもの */
export const LightningBarrierTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.BARRIER_LIGHTNING,
    path: "barrier/lightning/lightning.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
