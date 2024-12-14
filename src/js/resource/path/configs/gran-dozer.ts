import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** グランドーザ パス設定 */
export const GranDozerPathConfigs: PathConfig[] = [
  {
    id: PathIds.GRAN_DOZER_STAND,
    path: (root) => `${root.get()}/armdozer/gran-dozer/stand.webp`,
  },
  {
    id: PathIds.GRAN_DOZER_BUST_SHOT,
    path: (root) => `${root.get()}/armdozer/gran-dozer/bust-shot.webp`,
  },
  {
    id: PathIds.GRAN_DOZER_ICON,
    path: (root) => `${root.get()}/armdozer/genesis-braver/player-select.webp`,
  },
];
