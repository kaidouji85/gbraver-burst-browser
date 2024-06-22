import { map } from "rxjs";

import { BattleSimulator } from "../../../dom-dialogs/battle-simulator";
import { BattleSceneProps } from "../props";

/**
 * 戦闘シミュレーションダイアログに切り替える
 * @param props 戦闘シーンプロパティ
 * @param dialog 戦闘シミュレーションダイアログ
 */
export const switchBattleSimulator = (
  props: BattleSceneProps,
  dialog: BattleSimulator,
) =>
  props.domDialogBinder.bind(dialog, () =>
    props.battleSceneAction.connect([
      dialog.notifyClose().pipe(map(() => ({ type: "battleSimulatorEnd" }))),
    ]),
  );
