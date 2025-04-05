import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PlayingEpisode, Story } from "../../../in-progress/story";
import { playTitleBGM } from "../../play-title-bgm";
import { startEpisodeSelector } from "../../start-episode-selector";
import { startTitle } from "../../start-title";

/**
 * エピソードセレクターに遷移する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
const gotoEpisodeSelector = async (
  props: Readonly<
    GameProps & { inProgress: Story & { story: PlayingEpisode } }
  >,
) => {
  const selectedEpisodeId = props.inProgress.story.episode.id;
  await Promise.all([
    (async () => {
      await startEpisodeSelector(props, selectedEpisodeId);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);

  playTitleBGM(props);
};

/**
 * タイトル画面に遷移する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
const gotoTitle = async (props: Readonly<GameProps>) => {
  await props.fader.fadeOut();
  await Promise.all([
    (async () => {
      await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
};

/**
 * ストーリーモードバトルを強制終了する
 * @param props ゲームプロパティ
 * @returns inProgress更新結果
 */
export async function forceEndStoryBattle(
  props: Readonly<GameProps & { inProgress: Story }>,
): Promise<InProgress> {
  const { inProgress } = props;
  const { story, isTutorial } = inProgress;
  if (story.type === "PlayingEpisode" && !isTutorial) {
    await gotoEpisodeSelector({
      ...props,
      inProgress: { ...inProgress, story },
    });
    return { ...inProgress, story: { type: "EpisodeSelect" } };
  }

  await gotoTitle(props);
  return { type: "None" };
}
