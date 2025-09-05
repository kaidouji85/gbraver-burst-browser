import { map } from "rxjs";

import { StatusDialog } from "../../../dom-dialogs/status";
import { BattleSceneProps } from "../props";

/**
 * 戦闘シミュレーションダイアログに切り替える
 * @param props 戦闘シーンプロパティ
 * @param dialog 戦闘シミュレーションダイアログ
 */
export const switchStatus = (props: BattleSceneProps, dialog: StatusDialog) =>
  props.domDialogBinder.bind(
    dialog,
    props.battleSceneAction.connect([
      dialog.notifyClose().pipe(map(() => ({ type: "statusClosing" }))),
    ]),
  );
