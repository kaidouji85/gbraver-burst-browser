import { TEXTURE_IDS } from "../ids";
import { TextureConfig } from "../resource";

/** ウィングドーザのテクスチャ設定をあつめたもの */
export const WingDozerTextureConfigs: TextureConfig[] = [
  {
    id: TEXTURE_IDS.WING_DOZER_STAND,
    path: "armdozer/wing-dozer/stand.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPPER_CHARGE,
    path: "armdozer/wing-dozer/upper-charge.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPPER_ATTACK,
    path: "armdozer/wing-dozer/upper-attack.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPPER_TO_STAND,
    path: "armdozer/wing-dozer/upper-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DASH_UP,
    path: "armdozer/wing-dozer/dash-up.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DASH_DOWN,
    path: "armdozer/wing-dozer/dash-down.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DASH_TO_STAND,
    path: "armdozer/wing-dozer/dash-to-stand.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_KNOCK_BACK,
    path: "armdozer/wing-dozer/knock-back.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_DOWN,
    path: "armdozer/wing-dozer/down.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BACK_STEP,
    path: "armdozer/wing-dozer/back-step.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_FRONT_STEP,
    path: "armdozer/wing-dozer/front-step.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BURST_UP,
    path: "armdozer/wing-dozer/burst-up.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BURST_DOWN,
    path: "armdozer/wing-dozer/burst-down.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_GUARD,
    path: "armdozer/wing-dozer/guard.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BURST_BUTTON_ICON,
    path: "armdozer/wing-dozer/burst-button-icon.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_UPRIGHT,
    path: "armdozer/wing-dozer/upright.webp",
  },
  {
    id: TEXTURE_IDS.WING_DOZER_BOW,
    path: "armdozer/wing-dozer/bow.webp",
  },
].map((t) => ({ ...t, type: "Shared" }));
