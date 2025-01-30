import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { ForceEndBattle } from "../../game-actions/force-end-battle";
import { GameProps } from "../../game-props";
import { PlayingEpisode } from "../../in-progress/story";
import { playTitleBGM } from "../play-title-bgm";
import { startEpisodeSelector } from "../start-episode-selector";
import { startTitle } from "../start-title";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/**
 * 条件を満たした場合、ストーリーモードバトルを強制終了する
 * @param props ゲームプロパティ
 * @returns バトルを強制終了した場合はtrue, それ以外はfalse
 */
async function forceEndEpisodeIfNeeded(
  props: Readonly<GameProps>,
): Promise<boolean> {
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
 * 条件を満たした場合、ネットバトルを強制終了する
 * 本関数にはinProgressを更新する副作用がある
 * @param props ゲームプロパティ
 * @returns バトルを強制終了した場合はtrue, それ以外はfalse
 */
async function forceEndNetBattleIfNeeded(props: GameProps): Promise<boolean> {
  if (
    props.inProgress.type === "CasualMatch" ||
    props.inProgress.type === "PrivateMatchHost" ||
    props.inProgress.type === "PrivateMatchGuest"
  ) {
    props.inProgress = { type: "None" };
    const dialog = new WaitingDialog("通信中......");
    switchWaitingDialog(props, dialog);
    await props.api.disconnectWebsocket();
    props.domDialogBinder.hidden();

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
    return true;
  }

  return false;
}


/**
 * 汎用的なバトル強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param props ゲームプロパティ
 */
async function forceEndBattle(props: GameProps) {
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


/** onForceEndBattleオプション */
type ForceEndBattleOptions = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: ForceEndBattle;
};

/**
 * プレイヤーによるバトル強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param options オプション
 */
export async function onForceEndBattle(options: ForceEndBattleOptions) {
  const { props } = options;
  if (await forceEndEpisodeIfNeeded(props)) {
    return;
  }

  if (await forceEndNetBattleIfNeeded(props)) {
    return;
  }

  await forceEndBattle(props);
}
