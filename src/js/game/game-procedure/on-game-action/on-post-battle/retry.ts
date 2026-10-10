import { GameProps } from "../../../game-props";
import { PlayingEpisode, Story } from "../../../in-progress/story";
import { Retry } from "../../../post-battle";
import { startEpisode } from "../../start-episode";
import { gotoNPCBattleStage } from "./goto-npc-battle-stage";

/**
 * エピソードをリトライする
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function retryEpisode(
  props: Readonly<
    GameProps & { inProgress: Story & { story: PlayingEpisode } }
  >,
): Promise<void> {
  const episode = props.inProgress.story.episode;
  await startEpisode({ props, episode, isRetry: true });
}

/**
 * リトライ
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction リトライアクション
 * @returns 更新後のInProgress
 */
export async function retry(options: {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  postAction: Readonly<Retry>;
}) {
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
