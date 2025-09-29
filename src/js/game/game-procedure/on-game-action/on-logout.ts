import { Logout } from "../../game-actions/logout";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: Logout;
};

/**
 * ログアウト
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onLogout(options: Options): Promise<void> {
  const { props } = options;
  if (props.networkContext.type !== "online") {
    return;
  }

  await props.fader.fadeOut();
  await props.networkContext.sdk.logout();
}
