import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** リザルトのテクスチャ設定をあつめたもの */
export const ResultTextureConfigs: TextureConfig[] = [
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
].map((t) => ({ ...t, type: "Shared" }));
