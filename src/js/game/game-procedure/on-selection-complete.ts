import { DifficultyDialog } from "../../dom-dialogs/difficulty";
import { difficultyDialogConnector } from "../action-connector/difficulty-dialog-connector";
import { SelectionComplete } from "../game-actions";
import type { GameProps } from "../game-props";
import { startOnlineBattle } from "./start-online-battle";
import { waitUntilCasualMatching } from "./wait-until-casual-matching";

/**
 * プレイヤーキャラクター 選択完了時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectionComplete(
  props: GameProps,
  action: SelectionComplete
): Promise<void> {
  if (props.inProgress.type === "NPCBattle") {
    props.inProgress = {
      ...props.inProgress,
      subFlow: {
        type: "DifficultySelect",
        armdozerId: action.armdozerId,
        pilotId: action.pilotId,
      },
    };
    props.domDialogBinder.bind(
      new DifficultyDialog(props.resources),
      difficultyDialogConnector
    );
  } else if (props.inProgress.type === "CasualMatch") {
    props.inProgress = {
      ...props.inProgress,
      subFlow: {
        type: "Waiting",
      },
    };
    await props.api.disconnectWebsocket();
    const battle = await waitUntilCasualMatching(props, action);
    props.inProgress = {
      ...props.inProgress,
      subFlow: {
        type: "Battle",
      },
    };
    await startOnlineBattle(props, battle);
  }
}
