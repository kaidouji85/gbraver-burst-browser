import { ForceRetry } from "../../game-actions/force-retry";
import { GameProps } from "../../game-props";
import { PlayingEpisode } from "../../in-progress/story";
import { getCurrentNPCStage } from "../../npc-battle/get-current-npc-stage";
import { getNPCStageLevel } from "../../npc-battle/get-npc-stage-level";
import { NPCBattleState } from "../../npc-battle/npc-battle-state";
import { DefaultStage } from "../../npc-battle/stages/default-stage";
import { startEpisode } from "../start-episode";
import { startNPCBattleStage } from "../start-npc-battle-stage";

/**
 * 条件を満たした場合、NPCバトルを最初からやり直す
 * @param props ゲームプロパティ
 * @returns バトルをリトライした場合はtrue, それ以外はfalse
 */
async function forceRetryNPCBattleIfNeeded(
  props: Readonly<GameProps>,
): Promise<boolean> {
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
 * 条件を満たした場合、ストーリーモードバトルをリトライする
 * @param props ゲームプロパティ
 * @returns バトルをリトライした場合はtrue, それ以外はfalse
 */
async function forceRetryStory(props: Readonly<GameProps>): Promise<boolean> {
  if (
    props.inProgress.type === "Story" &&
    props.inProgress.story.type === "PlayingEpisode"
  ) {
    const playingEpisode: PlayingEpisode = props.inProgress.story;
    props.domFloaters.hiddenPostBattle();
    await startEpisode(props, playingEpisode.episode);
    return true;
  }

  return false;
}

/** onForceRetryオプション */
type OnForceRetryOptions = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: ForceRetry;
};

/**
 * プレイヤーによるバトルのリトライ
 * @param props ゲームプロパティ
 */
export async function onForceRetry(options: OnForceRetryOptions) {
  const { props } = options;
  if (await forceRetryNPCBattleIfNeeded(props)) {
    return;
  }

  if (await forceRetryStory(props)) {
    return;
  }
}
