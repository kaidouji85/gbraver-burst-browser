import { ArmdozerIds } from "gbraver-burst-core";

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
    id: TEXTURE_IDS.GRAN_DOZER_TACKLE_TO_BACK_STEP,
    path: "armdozer/gran-dozer/tackle-to-back-step.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_BURST_DOWN,
    path: "armdozer/gran-dozer/burst-down.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_FRONT_STEP,
    path: "armdozer/gran-dozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_BACK_STEP,
    path: "armdozer/gran-dozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_KNOCK_BACK,
    path: "armdozer/gran-dozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_DOWN,
    path: "armdozer/gran-dozer/down.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_GUARD,
    path: "armdozer/gran-dozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_CUTIN_BURST_UP,
    path: "armdozer/gran-dozer/cutin-burst-up.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_CUTIN_BURST_DOWN,
    path: "armdozer/gran-dozer/cutin-burst-down.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_BURST_BUTTON_ICON,
    path: "armdozer/gran-dozer/burst-button-icon.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_UPRIGHT,
    path: "armdozer/gran-dozer/upright.webp",
  },
  {
    id: TEXTURE_IDS.GRAN_DOZER_BOW,
    path: "armdozer/gran-dozer/bow.webp",
  },
].map((t) => ({
  ...t,
  type: "DynamicArmdozer",
  armdozerId: ArmdozerIds.GRAN_DOZER,
}));
