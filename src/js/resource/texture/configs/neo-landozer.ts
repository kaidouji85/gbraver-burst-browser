import { ArmdozerIds } from "gbraver-burst-core";

import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ネオランドーザのテクスチャ設定をあつめたもの */
export const NeoLandozerTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    path: "armdozer/neo-landozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK,
    path: "armdozer/neo-landozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUARD,
    path: "armdozer/neo-landozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_CHARGE,
    path: "armdozer/neo-landozer/hm-charge.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_ATTACK,
    path: "armdozer/neo-landozer/hm-attack.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_HM_TO_STAND,
    path: "armdozer/neo-landozer/hm-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_DOWN,
    path: "armdozer/neo-landozer/down.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUTS_DOWN,
    path: "armdozer/neo-landozer/guts-down.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_GUTS_UP,
    path: "armdozer/neo-landozer/guts-up.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_CUTIN_UP,
    path: "armdozer/neo-landozer/cutin-up.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_CUTIN_DOWN,
    path: "armdozer/neo-landozer/cutin-down.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_BACK_STEP,
    path: "armdozer/neo-landozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_FRONT_STEP,
    path: "armdozer/neo-landozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_BURST_BUTTON_ICON,
    path: "armdozer/neo-landozer/burst-button-icon.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_UPRIGHT,
    path: "armdozer/neo-landozer/upright.webp",
  },
  {
    id: TEXTURE_IDS.NEO_LANDOZER_BOW,
    path: "armdozer/neo-landozer/bow.webp",
  },
].map((t) => ({
  ...t,
  type: "DynamicArmdozer",
  armdozerId: ArmdozerIds.NEO_LANDOZER,
}));
