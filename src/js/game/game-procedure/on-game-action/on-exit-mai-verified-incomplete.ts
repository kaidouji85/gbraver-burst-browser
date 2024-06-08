import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";

/**
 * メール認証未完了画面を抜ける時の処理
 * @returns 処理が完了したら発火するPromise
 */
async function onExitMailVerifiedIncomplete(
  props: Readonly<GameProps>,
): Promise<void> {
  await props.fader.fadeOut();
  await props.api.logout();
}

/** アクションタイプ */
const actionType = "ExitMailVerifiedIncomplete";

/** メール認証未完了画面を抜ける時のリスナー */
export const exitMailVerifiedIncompleteListener = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onExitMailVerifiedIncomplete(props);
  },
};
