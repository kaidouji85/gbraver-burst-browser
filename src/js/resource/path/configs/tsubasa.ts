import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ツバサ パス設定 */
export const TsubasaPathConfigs: PathConfig[] = [
  {
    id: PathIds.TSUBASA_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/tsubasa/skill-cutin.webp`,
  },
  {
    id: PathIds.TSUBASA_ICON,
    path: (root) => `${root.get()}/pilot/tsubasa/player-select.webp`,
  },
];