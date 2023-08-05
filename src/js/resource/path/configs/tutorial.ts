import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** チュートリアル パス設定 */
export const TutorialPathConfigs: PathConfig[] = [
  {
    id: PathIds.TUTORIAL_IMAGE_CUT_01,
    path: (root) => `${root.get()}/tutorial/image-cut-01.webp`,
  },
  {
    id: PathIds.TUTORIAL_IMAGE_CUT_02,
    path: (root) => `${root.get()}/tutorial/image-cut-02.webp`,
  },
  {
    id: PathIds.TUTORIAL_IMAGE_CUT_03,
    path: (root) => `${root.get()}/tutorial/image-cut-03.webp`,
  },
];
