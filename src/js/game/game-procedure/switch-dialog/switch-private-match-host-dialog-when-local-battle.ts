import { map } from "rxjs";

import { PrivateMatchHostDialog } from "../../../dom-dialogs/private-match-host";
import { GameProps } from "../../game-props";

/**
 * ローカルバトルで利用するために、プライベートマッチ（ホスト）ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog プライベートマッチ（ホスト）ダイアログ
 */
export const switchPrivateMatchHostDialogWhenLocalBattle = (
  props: GameProps,
  dialog: PrivateMatchHostDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]),
  );
