import { CUBE_TEXTURE_IDS } from "./ids";
import { CubeTextureConfig } from "./resource";

/** キューブテクスチャ設定をまとめたもの */
export const CUBE_TEXTURE_CONFIGS: CubeTextureConfig[] = [
  {
    id: CUBE_TEXTURE_IDS.BlueSky,
    px: "sky-box/blue-sky/px.webp",
    nx: "sky-box/blue-sky/nx.webp",
    py: "sky-box/blue-sky/py.webp",
    ny: "sky-box/blue-sky/ny.webp",
    pz: "sky-box/blue-sky/pz.webp",
    nz: "sky-box/blue-sky/nz.webp",
  },
];
