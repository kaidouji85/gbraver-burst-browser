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
  if (Howler.ctx && typeof Howler.ctx.resume === "function") {
    Howler.ctx.resume().catch(() => {
      // resume失敗時はユーザー操作で再試行
      const tryResume = () => {
        Howler.ctx.resume().then(() => {
          // ここで再生中の音があれば再度play()を呼ぶ必要がある場合はここで呼ぶ
        }).finally(() => {
          document.body.removeEventListener("touchend", tryResume);
          document.body.removeEventListener("mousedown", tryResume);
        });
      };
      document.body.addEventListener("touchend", tryResume, { once: true });
      document.body.addEventListener("mousedown", tryResume, { once: true });
    });
  }
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
