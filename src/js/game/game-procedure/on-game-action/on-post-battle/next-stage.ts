import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { NextStage } from "../../../post-battle";
import { gotoNextEpisode } from "./goto-next-episode";
import { gotoNPCBattleStage } from "./goto-npc-battle-stage";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  postAction: Readonly<NextStage>;
};

/**
 * 次のステージ
 * @param options オプション
 * @returns 更新後のInProgress
 */
export async function nextStage(options: Options): Promise<InProgress> {
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
    const { story } = inProgress;
    await gotoNextEpisode({ ...props, inProgress: { ...inProgress, story } });
    ret = {
      type: "Story",
      story: { type: "PlayingEpisode", episode: story.nextEpisode },
    };
  }

  return ret;
}
