import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** クロージャー パス設定 */
export const CloserPathConfig: PathConfig[] = [
  {
    id: PathIds.CLOSER,
    path: (root) => `${root.get()}/dialog/closer.svg`,
  },
];