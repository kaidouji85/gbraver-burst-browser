import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ジェネシスブレイバー パス設定 */
export const GenesisBraverPathConfigs: PathConfig[] = [
  {
    id: PathIds.GENESIS_BRAVER_STAND,
    path: (root) => `${root.get()}/armdozer/genesis-braver/stand.webp`,
  },
  {
    id: PathIds.GENESIS_BRAVER_BUST_SHOT,
    path: (root) => `${root.get()}/armdozer/genesis-braver/bust-shot.webp`,
  },
  {
    id: PathIds.GENESIS_BRAVER_ICON,
    path: (root) => `${root.get()}/armdozer/genesis-braver/player-select.webp`,
  },
];
