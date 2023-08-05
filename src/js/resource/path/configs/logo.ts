import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ロゴ パス設定 */
export const LogoPathConfigs: PathConfig[] = [
  {
    id: PathIds.LOGO,
    path: (root) => `${root.get()}/logo.svg`,
  },
];
