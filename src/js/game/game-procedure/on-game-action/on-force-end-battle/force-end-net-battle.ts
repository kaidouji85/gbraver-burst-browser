import { fadeOut, stop } from "../../../../bgm/bgm-operators";
import { WaitingDialog } from "../../../../dom-dialogs/waiting/waiting-dialog";
import { GameProps } from "../../../game-props";
import { CasualMatch } from "../../../in-progress/casual-match";
import { OfflineLANCasualMatch } from "../../../in-progress/offline-lan-casual-match";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { disconnectConnection } from "../../helpers/disconnect-connection";
import { playTitleBGM } from "../../play-title-bgm";
import { startTitle } from "../../start-title";
import { switchWaitingDialog } from "../../switch-dialog/switch-waiting-dialog";

/**
 * ネットバトルを強制終了する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function forceEndNetBattle(
  props: Readonly<
    GameProps & {
      inProgress:
        | CasualMatch
        | PrivateMatchHost
        | PrivateMatchGuest
        | OfflineLANCasualMatch;
    }
  >,
) {
  const dialog = new WaitingDialog("通信中......");
  switchWaitingDialog(props, dialog);
  await disconnectConnection(props);
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
