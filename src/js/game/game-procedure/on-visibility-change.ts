import { Howler } from "howler";

/**
 * VisibilityChange時の処理
 */
export function onVisibilityChange(): void {
  const shouldMute = document.visibilityState === "hidden";
  Howler.mute(shouldMute);
}
