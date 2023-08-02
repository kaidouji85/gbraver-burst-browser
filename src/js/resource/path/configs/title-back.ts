import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** タイトルバック パス設定 */
export const TitleBackPathConfigs: PathConfig[] = [
  {
    id: PathIds.TITLE_BACK,
    path: (root) => `${root.get()}/title-back.webp`,
  },
];