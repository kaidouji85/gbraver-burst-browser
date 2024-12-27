import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { NextStage } from "../../../post-battle";
import { gotoEpisode } from "./goto-episode";
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
    inProgress.story.type === "PlayingEpisode"
  ) {
    const { story } = inProgress;
    await gotoEpisode({ ...props, inProgress: { ...inProgress, story } });
  }

  return props.inProgress;
}
