import { map } from "rxjs";

import { DifficultyDialog } from "../../../dom-dialogs/difficulty";
import { GameProps } from "../../game-props";

/**
 * 難易度選択ダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog 難易度選択ダイアログ
 */
export const switchDifficultyDialog = (
  props: GameProps,
  dialog: DifficultyDialog,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.gameAction.connect([
      dialog.notifySelectionComplete().pipe(
        map((difficulty) => ({
          type: "DifficultySelectionComplete",
          difficulty,
        })),
      ),
      dialog
        .notifyClosed()
        .pipe(map(() => ({ type: "DifficultySelectionCancel" }))),
    ]),
  );
