import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ガイ パス設定 */
export const GaiPathConfigs: PathConfig[] = [
  {
    id: PathIds.GAI_ICON,
    path: (root) => `${root.get()}/pilot/gai/player-select.webp`,
  },
  {
    id: PathIds.GAI_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/gai/skill-cutin.webp`,
  },
];