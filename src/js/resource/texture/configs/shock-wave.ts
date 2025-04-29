import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** 衝撃波のテクスチャ設定をまとめたもの */
export const ShockWaveTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.HITMARK_SHOCK_WAVE_LINE,
    path: "hitmark/shock-wave/line.webp",
  },
  {
    id: TEXTURE_IDS.HITMARK_SHOCK_WAVE_RING,
    path: "hitmark/shock-wave/ring.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
