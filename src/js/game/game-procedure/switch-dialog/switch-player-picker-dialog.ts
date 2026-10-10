import { map } from "rxjs";

import { PlayerPickerDialog } from "../../dialogs/player-picker";
import { GameProps } from "../../game-props";

/**
 * プレイヤーピッカーダイアログに切り替える
 * @param props プロパティ
 * @param dialog ダイアログ
 */
export const switchPlayerPickerDialog = (
  props: GameProps,
  dialog: PlayerPickerDialog,
) =>
  props.domDialogBinder.bind(
    dialog,
    props.gameAction.connect([
      dialog.notifyConfirm().pipe(
        map(({ armdozerId, pilotId }) => ({
          type: "PostBattleAction",
          postAction: { type: "Rematch", armdozerId, pilotId },
        })),
      ),
      dialog
        .notifyClose()
        .pipe(
          map(() => ({
            type: "PostBattleAction",
            postAction: { type: "GotoTitle" },
          })),
        ),
    ]),
  );
