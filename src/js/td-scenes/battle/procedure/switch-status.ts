import { map } from "rxjs";

import { StatusDialog } from "../../../dom-dialogs/status";
import { BattleSceneProps } from "../props";

/**
 * ステータスダイアログに切り替える
 * @param props 戦闘シーンプロパティ
 * @param dialog ステータスダイアログ
 */
export const switchStatus = (props: BattleSceneProps, dialog: StatusDialog) =>
  props.domDialogBinder.bind(
    dialog,
    props.battleSceneAction.connect([
      dialog.notifyClose().pipe(map(() => ({ type: "statusClosing" }))),
    ]),
  );
