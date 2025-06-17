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
 */
export async function nextStage(options: Options) {
  const { props } = options;
  const { inProgress } = props;
  if (
    inProgress.type === "NPCBattle" &&
    inProgress.npcBattle.type === "PlayingNPCBattle"
  ) {
    const { npcBattle } = inProgress;
    await gotoNPCBattleStage({
      ...props,
      inProgress: { ...inProgress, npcBattle },
    });
  } else if (
    inProgress.type === "Story" &&
    inProgress.story.type === "GoingNextEpisode"
  ) {
    const episode = inProgress.story.nextEpisode;
    const story: PlayingEpisode = { type: "PlayingEpisode", episode };
    props.inProgress = { ...inProgress, story };
    await startEpisode({ props, episode });
  }
}
