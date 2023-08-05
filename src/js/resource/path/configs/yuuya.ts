import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ユウヤ パス設定 */
export const YuuyaPathConfigs: PathConfig[] = [
  {
    id: PathIds.YUUYA_SKILL_CUTIN,
    path: (root) => `${root.get()}/pilot/yuuya/skill-cutin.webp`,
  },
  {
    id: PathIds.YUUYA_ICON,
    path: (root) => `${root.get()}/pilot/yuuya/player-select.webp`,
  },
];
