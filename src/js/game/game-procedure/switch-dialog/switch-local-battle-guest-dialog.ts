import { map } from "rxjs";

import { LocalBattleGuestDialog } from "../../../dom-dialogs/local-battle-guest";
import { GameProps } from "../../game-props";

/**
 * ローカル対戦（ゲスト）ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog ローカル対戦（ゲスト）ダイアログ
 */
export const switchLocalBattleGuestDialog = (
  props: GameProps,
  dialog: LocalBattleGuestDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog.notifyBattleStart().pipe(
        map(({ password }) => ({
          type: "LocalBattleEntry",
          roomID: password,
        })),
      ),
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "WithdrawLocalBattleEntry" }))),
    ]),
  );
