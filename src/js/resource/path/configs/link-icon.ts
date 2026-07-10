import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** リンクアイコン パス設定 */
export const LinkIconConfigs: PathConfig[] = [
  {
    id: PathIds.LINK_ICON,
    path: (root) => `${root.get()}/link-icon.svg`,
  },
];
