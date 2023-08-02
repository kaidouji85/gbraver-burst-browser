import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ヘルプアイコン パス設定 */
export const HelpIconPathConfigs: PathConfig[] = [
  {
    id: PathIds.HELP_ICON,
    path: (root) => `${root.get()}/help-icon.svg`,
  },
];