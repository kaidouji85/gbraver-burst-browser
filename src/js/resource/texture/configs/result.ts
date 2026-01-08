import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** リザルトのテクスチャ設定をあつめたもの */
export const ResultTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.WIN,
    path: "result/win.webp",
  },
  {
    id: TEXTURE_IDS.LOSE,
    path: "result/lose.webp",
  },
  {
    id: TEXTURE_IDS.DRAW,
    path: "result/draw.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
