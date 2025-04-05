import { GameProps } from "../../../game-props";
import { PlayingEpisode } from "../../../in-progress/story";
import { NextStage } from "../../../post-battle";
import { startEpisode } from "../../start-episode";
import { gotoNPCBattleStage } from "./goto-npc-battle-stage";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  postAction: Readonly<NextStage>;
};

/**
 * 次のステージ
 * 本関数はprops.inProgressを変更する副作用を持つ
 * @param options オプション
 * @returns 更新後のInProgress
 */
export async function nextStage(options: Options) {
  const { props } = options;
  const { inProgress } = props;
  let ret = inProgress;

  if (
    inProgress.type === "NPCBattle" &&
    inProgress.npcBattle.type === "PlayingNPCBattle"
  ) {
    const { npcBattle } = inProgress;
    await gotoNPCBattleStage({
      ...props,
      inProgress: { ...inProgress, npcBattle },
    });
    ret = inProgress;
  } else if (
    inProgress.type === "Story" &&
    inProgress.story.type === "GoingNextEpisode"
  ) {
    const story: PlayingEpisode = {
      type: "PlayingEpisode",
      episode: inProgress.story.nextEpisode,
    };
    props.inProgress = { ...inProgress, story };
    await startEpisode(props, story.episode);
  }

  return ret;
}
