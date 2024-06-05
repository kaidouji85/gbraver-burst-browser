import { map } from "rxjs";

import { BattleSimulator } from "../../../dom-dialogs/battle-simulator";
import { DomDialogActionConnector } from "../../../dom-dialogs/dom-dialog-binder/action-connector";
import { BattleSceneActionManageContainer } from "../battle-scene-action-manage-container";

/**
 * 戦闘シミュレーションダイアログのアクションコネクタを生成する
 * @param props 戦闘シーンアクション管理コンテナ
 * @returns アクションコネクタ
 */
export const battleSimulatorConnector =
  (
    props: BattleSceneActionManageContainer,
  ): DomDialogActionConnector<BattleSimulator> =>
  (dialog) =>
    props.battleSceneAction.connect([
      dialog.notifyClose().pipe(map(() => ({ type: "battleSimulatorEnd" }))),
    ]);
