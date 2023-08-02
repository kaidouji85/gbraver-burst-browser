import { PathIds } from "../../path/ids";
import { PathConfig } from "../../path/resource";

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