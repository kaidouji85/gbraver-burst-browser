import { UniversalLogin } from "../../game-actions/universal-login";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: UniversalLogin;
};

/**
 * ユニバーサルログイン
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onUniversalLogin(options: Options): Promise<void> {
  const { props } = options;
  await props.fader.fadeOut();
  await props.api.gotoLoginPage();
}
