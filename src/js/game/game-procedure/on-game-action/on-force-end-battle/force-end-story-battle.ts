import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { batterySystemTutorial } from "../../../episodes/battery-system-tutorial";
import { GameProps } from "../../../game-props";
import { Story } from "../../../in-progress/story";
import { playTitleBGM } from "../../play-title-bgm";
import { startEpisodeSelector } from "../../start-episode-selector";

/**
 * ストーリーモードバトルを強制終了する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function forceEndStoryBattle(
  props: Readonly<GameProps & { inProgress: Story }>,
) {
  props.domFloaters.hiddenPostBattle();

  const selectedEpisodeId =
    props.inProgress.story.type === "PlayingEpisode"
      ? props.inProgress.story.episode.id
      : batterySystemTutorial.id;
  await Promise.all([
    (async () => {
      props.domFloaters.hiddenPostBattle();
      await startEpisodeSelector(props, selectedEpisodeId);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);

  playTitleBGM(props);
}
