import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** グランドーザのテクスチャ設定をあつめたもの */
export const GranDozerTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.GRAN_DOZER_STAND,
    path: "armdozer/gran-dozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_TACKLE_CHARGE,
    path: "armdozer/gran-dozer/tackle-charge.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_TACKLE_ATTACK,
    path: "armdozer/gran-dozer/tackle-attack.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_TACKLE_TO_STAND,
    path: "armdozer/gran-dozer/tackle-to-stand.webp",
  },
];
