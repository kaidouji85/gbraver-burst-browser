import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { PlayingEpisode } from "../../in-progress/story";
import { playTitleBGM } from "../play-title-bgm";
import { startEpisodeSelector } from "../start-episode-selector";
import { startTitle } from "../start-title";

/**
 * NPCバトルの強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param props ゲームプロパティ
 */
async function forceEndNPCBattle(props: GameProps) {
  props.inProgress = { type: "None" };
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
  ]);
  await props.fader.fadeIn();
  playTitleBGM(props);
}

/**
 * 条件を満たした場合、ストーリーモードバトルを強制終了する
 * @param props ゲームプロパティ
 */
async function forceEndEpisodeIfNeeded(props: Readonly<GameProps>) {
  if (
    props.inProgress.type === "Story" &&
    props.inProgress.story.type === "PlayingEpisode"
  ) {
    const playingEpisode: PlayingEpisode = props.inProgress.story;
    await Promise.all([
      (async () => {
        props.domFloaters.hiddenPostBattle();
        await startEpisodeSelector(props, playingEpisode.episode.id);
      })(),
      (async () => {
        await props.bgm.do(fadeOut);
        await props.bgm.do(stop);
      })(),
    ]);

    playTitleBGM(props);
    return true;
  }

  return false;
}

/**
 * プレイヤーによるバトル強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param props ゲームプロパティ
 */
async function onForceEndBattle(props: GameProps) {
  if (await forceEndEpisodeIfNeeded(props)) {
    return;
  } else {
    await forceEndNPCBattle(props);
  }
}

/** アクションタイプ */
const actionType = "ForceEndBattle";

/** プレイヤーによるバトル強制終了のイベントリスナーコンテナ */
export const forceEndBattleContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onForceEndBattle(props);
    }
  },
};
