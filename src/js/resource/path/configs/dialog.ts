import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** ダイアログ パス設定 */
export const DialogPathConfig: PathConfig[] = [
  {
    id: PathIds.CLOSER,
    path: (root) => `${root.get()}/dialog/closer.svg`,
  },
];