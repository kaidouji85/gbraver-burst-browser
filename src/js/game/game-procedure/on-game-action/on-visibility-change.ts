import { Howler } from "howler";

import { VisibilityChange } from "../../game-actions/visibility-change";
import { GameProps } from "../../game-props";

/**
 * visibilityState = "hidden" の場合の処理
 */
const onHidden = () => {
  console.log("visibilityState = hidden"); // TODO: ログ出力を削除する
  Howler.mute(true);
};

/**
 * visibilityState = "visible" の場合の処理
 */
const onVisible = () => {
  console.log("visibilityState = visible"); // TODO: ログ出力を削除する
  Howler.mute(false);
  Howler.ctx.resume();
};

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
  if (document.visibilityState === "hidden") {
    onHidden();
  } else {
    onVisible();
  }
}
