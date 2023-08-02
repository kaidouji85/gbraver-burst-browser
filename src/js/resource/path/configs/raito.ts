import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ライト パス設定 */
export const RaitoPathConfigs: PathConfig[] = [
  {
    id: PathIds.RAITO_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/raito/skill-cutin.webp`,
  },
  {
    id: PathIds.RAITO_ICON,
    path: (root) => `${root.get()}/pilot/raito/player-select.webp`,
  },
];