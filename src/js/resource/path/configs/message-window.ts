import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** メッセージウインドウ パス設定 */
export const MessageWindowPathConfigs: PathConfig[] = [
  {
    id: PathIds.MESSAGE_WINDOW_ATTACK_BATTERY,
    path: (root) => `${root.get()}/message-window/attack-battery.webp`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_DEFENSE_BATTERY,
    path: (root) => `${root.get()}/message-window/defense-battery.webp`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_PLUS_BATTERY,
    path: (root) => `${root.get()}/message-window/plus-battery.webp`,
  },
  {
    id: PathIds.MESSAGE_WINDOW_MINUS_BATTERY,
    path: (root) => `${root.get()}/message-window/minus-battery.webp`,
  },
];