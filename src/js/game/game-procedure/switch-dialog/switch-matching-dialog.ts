import { map } from "rxjs";

import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { GameProps } from "../../game-props";

/**
 * マッチングダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog マッチングダイアログ
 */
export const switchMatchingDialog = (
  props: GameProps,
  dialog: MatchingDialog,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog
        .notifyMatchingCanceled()
        .pipe(map(() => ({ type: "MatchingCanceled" }))),
    ]),
  );
