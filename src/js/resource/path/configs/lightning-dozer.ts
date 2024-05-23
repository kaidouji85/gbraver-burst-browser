import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ライトニングドーザ パス設定 */
export const LightningDozerPathConfigs: PathConfig[] = [
  {
    id: PathIds.LIGHTNING_DOZER_ICON,
    path: (root) => `${root.get()}/armdozer/lightning-dozer/player-select.webp`,
  },
  {
    id: PathIds.LIGHTNING_DOZER_BUST_SHOT,
    path: (root) => `${root.get()}/armdozer/lightning-dozer/bust-shot.webp`,
  },
  {
    id: PathIds.LIGHTNING_DOZER_STAND,
    path: (root) => `${root.get()}/armdozer/lightning-dozer/stand.webp`,
  },
];
