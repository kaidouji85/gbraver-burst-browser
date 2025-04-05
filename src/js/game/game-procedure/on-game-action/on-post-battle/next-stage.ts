import { GameProps } from "../../../game-props";
import { NextStage } from "../../../post-battle";
import { gotoNextEpisode } from "./goto-next-episode";
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
 * 本関数はprops.inPrigressを変更する副作用を持つ
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
    const { story } = inProgress;
    await gotoNextEpisode({ ...props, inProgress: { ...inProgress, story } });
    props.inProgress = {
      type: "Story",
      story: { type: "PlayingEpisode", episode: story.nextEpisode },
    };
  }
}
