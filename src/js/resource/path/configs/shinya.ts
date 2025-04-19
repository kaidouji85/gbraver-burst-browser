import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** シンヤ パス設定 */
export const ShinyaPathConfigs: PathConfig[] = [
  {
    id: PathIds.SHINYA_ICON,
    path: (root) => `${root.get()}/pilot/shinya/player-select.webp`,
  },
  {
    id: PathIds.SHINYA_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/shinya/skill-cutin.webp`,
  },
];
