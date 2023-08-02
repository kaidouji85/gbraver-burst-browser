import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ランドスケープ警告 パス設定 */
export const PlayInLandscapePathConfigs: PathConfig[] = [
  {
    id: PathIds.PLAY_IN_LANDSCAPE,
    path: (root) => `${root.get()}/waring/play-in-landscape.webp`,
  },
];
