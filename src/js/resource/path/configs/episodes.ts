import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** チュートリアル パス設定 */
export const TutorialPathConfigs: PathConfig[] = [
  {
    id: PathIds.IMAGE_CUT_BATTERY_SYSTEM,
    path: (root) => `${root.get()}/episodes/image-cut-battery-system.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_ZERO_DEFENSE,
    path: (root) => `${root.get()}/episodes/image-cut-zero-defense.webp`,
  },
  {
    id: PathIds.IMAGE_CUT_BURST,
    path: (root) => `${root.get()}/episodes/image-cut-burst.webp`,
  },
];
