import { Howler } from "howler";

import { VisibilityChange } from "../../visibility-change/visibility-change";

/**
 * VisibilityChange時の処理
 * @param action アクション
 */
export function onVisibilityChange(action: VisibilityChange): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  const shouldMute = document.visibilityState === "hidden";
  Howler.mute(shouldMute);
}
