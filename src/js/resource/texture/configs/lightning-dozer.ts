import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";
import { ArmdozerIds } from "gbraver-burst-core";

/** ライトニングドーザのテクスチャ設定をまとめたもの */
export const LightningDozerTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_STAND,
    path: "armdozer/lightning-dozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_CHARGE,
    path: "armdozer/lightning-dozer/hm-charge.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_ATTACK,
    path: "armdozer/lightning-dozer/hm-attack.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_TO_STAND,
    path: "armdozer/lightning-dozer/hm-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_KNOCK_BACK,
    path: "armdozer/lightning-dozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_DOWN,
    path: "armdozer/lightning-dozer/down.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_UP,
    path: "armdozer/lightning-dozer/guts-up.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_DOWN,
    path: "armdozer/lightning-dozer/guts-down.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUTS_TO_STAND,
    path: "armdozer/lightning-dozer/guts-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_GUARD,
    path: "armdozer/lightning-dozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_UP,
    path: "armdozer/lightning-dozer/cutin-up.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_DOWN,
    path: "armdozer/lightning-dozer/cutin-down.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_BACK_STEP,
    path: "armdozer/lightning-dozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_FRONT_STEP,
    path: "armdozer/lightning-dozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_BURST_BUTTON_ICON,
    path: "armdozer/lightning-dozer/burst-button-icon.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_UPRIGHT,
    path: "armdozer/lightning-dozer/upright.webp",
  },
  {
    id: TEXTURE_IDS.LIGHTNING_DOZER_BOW,
    path: "armdozer/lightning-dozer/bow.webp",
  },
].map((t) => ({
  ...t,
  type: "DynamicArmdozer",
  armdozerId: ArmdozerIds.LIGHTNING_DOZER,
}));
