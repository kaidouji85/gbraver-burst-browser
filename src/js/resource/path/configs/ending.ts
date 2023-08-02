import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** エンディング パス設定 */
export const EndingPathConfigs: PathConfig[] = [
  {
    id: PathIds.END,
    path: (root) => `${root.get()}/ending/end.svg`,
  },
  {
    id: PathIds.END_CARD,
    path: (root) => `${root.get()}/ending/end-card.webp`,
  },

];