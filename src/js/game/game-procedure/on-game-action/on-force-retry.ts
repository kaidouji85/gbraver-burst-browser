import { batterySystemTutorial } from "../../episodes/battery-system-tutorial";
import { ForceRetry } from "../../game-actions/force-retry";
import { GameProps } from "../../game-props";
import { NPCBattle, PlayingNPCBattle } from "../../in-progress/npc-battle";
import { Story } from "../../in-progress/story";
import { getCurrentNPCStage } from "../../npc-battle/get-current-npc-stage";
import { getNPCStageLevel } from "../../npc-battle/get-npc-stage-level";
import { DefaultStage } from "../../npc-battle/stages/default-stage";
import { startEpisode } from "../start-episode";
import { startNPCBattleStage } from "../start-npc-battle-stage";

/**
 * NPCバトルを最初からやり直す
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function forceRetryNPCBattle(
  props: GameProps & {
    inProgress: NPCBattle & { npcBattle: PlayingNPCBattle };
  },
) {
  const { inProgress } = props;
  const { state } = inProgress.npcBattle;
  const stage = getCurrentNPCStage(state) ?? DefaultStage;
  const level = getNPCStageLevel(state);
  const player = state.player;
  await startNPCBattleStage(props, player, stage, level);
}

/**
 * ストーリーモードバトルをリトライする
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function forceRetryStoryBattle(props: GameProps & { inProgress: Story }) {
  const { story } = props.inProgress;
  const episode = (() => {
    switch (story.type) {
      case "PlayingEpisode":
        return story.episode;
      case "GoingNextEpisode":
        return story.currentEpisode;
      default:
        return batterySystemTutorial;
    }
  })();
  await startEpisode(props, episode);
}

/** onForceRetryオプション */
type OnForceRetryOptions = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: ForceRetry;
};

/**
 * プレイヤーによるバトルのリトライ
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onForceRetry(options: OnForceRetryOptions) {
  const { props } = options;
  const { inProgress } = props;
  if (inProgress.type === "Story") {
    await forceRetryStoryBattle({ ...props, inProgress });
  } else if (
    inProgress.type === "NPCBattle" &&
    inProgress.npcBattle.type === "PlayingNPCBattle"
  ) {
    const { npcBattle } = inProgress;
    await forceRetryNPCBattle({
      ...props,
      inProgress: { ...inProgress, npcBattle },
    });
  }
}
