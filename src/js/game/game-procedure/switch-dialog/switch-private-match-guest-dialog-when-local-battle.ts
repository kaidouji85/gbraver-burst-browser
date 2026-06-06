import { map } from "rxjs";

import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { GameProps } from "../../game-props";

/**
 * ローカルバトルで使うために、プライベートマッチ（ゲスト）ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog プライベートマッチ（ゲスト）ダイアログ
 */
export const switchPrivateMatchGuestDialogWhenLocalBattle = (
  props: GameProps,
  dialog: PrivateMatchGuestDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog
        .notifyPrivateMatchStart()
        .pipe(map((roomID) => ({ type: "LocalBattleEntry", roomID }))),
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "WithdrawLocalBattleEntry" }))),
    ]),
  );
