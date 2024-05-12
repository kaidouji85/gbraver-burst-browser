import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ウィングドーザ パス設定 */
export const WingDozerPathConfigs: PathConfig[] = [
  {
    id: PathIds.WING_DOZER_ICON,
    path: (root) => `${root.get()}/armdozer/wing-dozer/player-select.webp`,
  },
  {
    id: PathIds.WING_DOZER_BUST_SHOT,
    path: (root) => `${root.get()}/armdozer/wing-dozer/bust-shot.webp`,
  },
  {
    id: PathIds.WING_DOZER_STAND,
    path: (root) => `${root.get()}/armdozer/wing-dozer/stand.webp`,
  },
];
