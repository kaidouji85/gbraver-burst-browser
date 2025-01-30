import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { batterySystemTutorial } from "../../episodes/battery-system-tutorial";
import { ForceEndBattle } from "../../game-actions/force-end-battle";
import { GameProps } from "../../game-props";
import { CasualMatch } from "../../in-progress/casual-match";
import { PrivateMatchGuest } from "../../in-progress/private-match-guest";
import { PrivateMatchHost } from "../../in-progress/private-match-host";
import { Story } from "../../in-progress/story";
import { playTitleBGM } from "../play-title-bgm";
import { startEpisodeSelector } from "../start-episode-selector";
import { startTitle } from "../start-title";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/**
 * ストーリーモードバトルを強制終了する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function forceEndStoryBattle(
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

/**
 * ネットバトルを強制終了する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function forceEndNetBattle(
  props: Readonly<
    GameProps & {
      inProgress: CasualMatch | PrivateMatchHost | PrivateMatchGuest;
    }
  >,
) {
  props.domFloaters.hiddenPostBattle();

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
}

/**
 * 汎用的なバトル強制終了
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function forceEndBattle(props: Readonly<GameProps>) {
  props.domFloaters.hiddenPostBattle();
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
  readonly action: ForceEndBattle;
};

/**
 * プレイヤーによるバトル強制終了
 * 本関数にはinProgressを更新する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onForceEndBattle(options: ForceEndBattleOptions) {
  const { props } = options;
  const { inProgress } = props;

  switch (inProgress.type) {
    case "CasualMatch":
    case "PrivateMatchHost":
    case "PrivateMatchGuest":
      await forceEndNetBattle({ ...props, inProgress });
      break;
    case "Story":
      await forceEndStoryBattle({ ...props, inProgress });
      break;
    default:
      forceEndBattle(props);
      break;
  }

  props.inProgress = { type: "None" };
}
