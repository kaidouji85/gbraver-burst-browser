import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ユーザー関連のパス設定 */
export const UserConfigs: PathConfig[] = [
  {
    id: PathIds.DEFAULT_USER_ICON,
    path: (root) => `${root.get()}/default-user-icon.webp`,
  },
];
