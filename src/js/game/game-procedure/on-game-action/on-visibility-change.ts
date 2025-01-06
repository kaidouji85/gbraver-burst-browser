import { Howler } from "howler";

import { VisibilityChange } from "../../game-actions/visibility-change";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: VisibilityChange;
};

/**
 * VisibilityChange時の処理
 * @param options オプション
 */
export function onVisibilityChange(
  options: Options, // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  const shouldMute = document.visibilityState === "hidden";
  Howler.mute(shouldMute);
}
