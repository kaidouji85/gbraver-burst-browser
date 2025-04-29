import { ArmdozerIds } from "gbraver-burst-core";

import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** シンブレイバーのテクスチャ設定をあつめたもの */
export const ShinBraverTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.SHIN_BRAVER_STAND,
    path: "armdozer/shin-braver/stand.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_CHARGE,
    path: "armdozer/shin-braver/sp-charge.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_ATTACK,
    path: "armdozer/shin-braver/sp-attack.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_SP_TO_STAND,
    path: "armdozer/shin-braver/sp-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_KNOCK_BACK,
    path: "armdozer/shin-braver/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUARD,
    path: "armdozer/shin-braver/guard.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_DOWN,
    path: "armdozer/shin-braver/down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUTS_UP,
    path: "armdozer/shin-braver/guts-up.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_GUTS_DOWN,
    path: "armdozer/shin-braver/guts-down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_UP,
    path: "armdozer/shin-braver/burst-up.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN,
    path: "armdozer/shin-braver/burst-down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_CUTIN_UP,
    path: "armdozer/shin-braver/cutin-up.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_CUTIN_DOWN,
    path: "armdozer/shin-braver/cutin-down.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BACK_STEP,
    path: "armdozer/shin-braver/back-step.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_FRONT_STEP,
    path: "armdozer/shin-braver/front-step.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BURST_BUTTON_ICON,
    path: "armdozer/shin-braver/burst-button-icon.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_UPRIGHT,
    path: "armdozer/shin-braver/upright.webp",
  },
  {
    id: TEXTURE_IDS.SHIN_BRAVER_BOW,
    path: "armdozer/shin-braver/bow.webp",
  },
].map((t) => ({
  ...t,
  type: "DynamicArmdozer",
  armdozerId: ArmdozerIds.SHIN_BRAVER,
}));
