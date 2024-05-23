import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ネオランドーザ パス設定 */
export const NeoLandozerPathConfigs: PathConfig[] = [
  {
    id: PathIds.NEO_LANDOZER_ICON,
    path: (root) => `${root.get()}/armdozer/neo-landozer/player-select.webp`,
  },
  {
    id: PathIds.NEO_LANDOZER_BUST_SHOT,
    path: (root) => `${root.get()}/armdozer/neo-landozer/bust-shot.webp`,
  },
  {
    id: PathIds.NEO_LANDOZER_STAND,
    path: (root) => `${root.get()}/armdozer/neo-landozer/stand.webp`,
  },
];
