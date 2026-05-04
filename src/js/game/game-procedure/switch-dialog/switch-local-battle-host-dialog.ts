import { map } from "rxjs";

import { LocalBattleHostDialog } from "../../../dom-dialogs/local-battle-host";
import { GameProps } from "../../game-props";

/**
 * ローカル対戦（ホスト）ダイアログに切り替える
 * @param props プロパティ
 * @param dialog ダイアログ
 */
export const switchLocalBattleHostDialog = (
  props: GameProps,
  dialog: LocalBattleHostDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog
        .notifyDialogClosed()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]),
  );
