import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** チェックマーク パス設定 */
export const CheckPathConfigs: PathConfig[] = [
  {
    id: PathIds.CHECK,
    path: (root) => `${root.get()}/check/check.webp`,
  },
];