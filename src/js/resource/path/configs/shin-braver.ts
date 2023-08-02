import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** シンブレイバー パス設定 */
export const ShinBraverPathConfigs: PathConfig[] = [
  {
    id: PathIds.SHIN_BRAVER_ICON,
    path: (root) => `${root.get()}/armdozer/shin-braver/player-select.webp`,
  },
  {
    id: PathIds.SHIN_BRAVER_BUST_SHOT,
    path: (root) => `${root.get()}/armdozer/shin-braver/bust-shot.webp`,
  },
  {
    id: PathIds.SHIN_BRAVER_STAND,
    path: (root) => `${root.get()}/armdozer/shin-braver/stand.webp`,
  },
];