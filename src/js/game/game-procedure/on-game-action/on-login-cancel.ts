import { LoginCancel } from "../../game-actions/login-cancel";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: LoginCancel;
};

/**
 * ログイン中断
 * @param options オプション
 */
export function onLoginCancel(options: Options): void {
  const { props } = options;
  props.domDialogBinder.hidden();
}
