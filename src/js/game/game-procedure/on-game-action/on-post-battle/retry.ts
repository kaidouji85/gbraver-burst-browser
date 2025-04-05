import { GameProps } from "../../../game-props";
import { Retry } from "../../../post-battle";
import { gotoNPCBattleStage } from "./goto-npc-battle-stage";
import { retryEpisode } from "./retry-episode";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  postAction: Readonly<Retry>;
};

/**
 * リトライ
 * @param options オプション
 * @returns 更新後のInProgress
 */
export async function retry(options: Options) {
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
    await retryEpisode({ ...props, inProgress: { ...inProgress, story } });
  }
}
