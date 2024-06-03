import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ターンインジケーター パス設定 */
export const TurnIndicatorConfigs: PathConfig[] = [
  {
    id: PathIds.TURN_INDICATOR,
    path: (root) => `${root.get()}/turn/turn-indicator.webp`,
  },
];
