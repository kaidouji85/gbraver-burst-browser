import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { getCurrentNPCStage } from "../../npc-battle/get-current-npc-stage";
import { getNPCStageLevel } from "../../npc-battle/get-npc-stage-level";
import { NPCBattleState } from "../../npc-battle/npc-battle-state";
import { DefaultStage } from "../../npc-battle/stages/default-stage";
import { startNPCBattleStage } from "../start-npc-battle-stage";

/**
 * 条件を満たした場合、NPCバトルを最初からやり直す
 * @param props ゲームプロパティ
 * @returns バトルをリトライした場合はtrue, それ以外はfalse
 */
async function forceRetryNPCBattleIfNeeded(props: Readonly<GameProps>): Promise<boolean> {
  if (
    props.inProgress.type === "NPCBattle" &&
    props.inProgress.npcBattle.type === "PlayingNPCBattle"
  ) {
    const state: NPCBattleState = props.inProgress.npcBattle.state;
    const stage = getCurrentNPCStage(state) ?? DefaultStage;
    const level = getNPCStageLevel(state);
    const player = state.player;
    props.domFloaters.hiddenPostBattle();
    await startNPCBattleStage(props, player, stage, level);
    return true;
  }

  return false;
}

/**
 * プレイヤーによるバトルのリトライ
 * @param props ゲームプロパティ
 */
async function onForceRetry(props: Readonly<GameProps>) {
  if (await forceRetryNPCBattleIfNeeded(props)) {
    return;
  }
}

/** アクションタイプ */
const actionType = "ForceRetry";

/** プレイヤーによるバトルのリトライのイベントリスナーコンテナ */
export const forceRetryContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onForceRetry(props);
    }
  },
};
