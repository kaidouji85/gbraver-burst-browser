import { map } from "rxjs";

import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { GameProps } from "../../game-props";

/**
 * プライベートマッチ（ゲスト）ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog プライベートマッチ（ゲスト）ダイアログ
 * @returns アクションコネクタ
 */
export const switchPrivateMatchGuestDialog = (
  props: GameProps,
  dialog: PrivateMatchGuestDialog,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog
        .notifyPrivateMatchStart()
        .pipe(map((roomID) => ({ type: "PrivateMatchEntry", roomID }))),
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "WithdrawPrivateMatchEntry" }))),
    ]),
  );
