import { fadeOut, stop } from "../../../../sounds/bgm/bgm-operators";
import { GameProps } from "../../../game-props";
import { GotoTitle } from "../../../post-network-error";
import { disconnectAll } from "../../disconnect-all";
import { playTitleBGM } from "../../play-title-bgm";
import { startTitle } from "../../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  postAction: Readonly<GotoTitle>;
};

/**
 * タイトルに遷移する
 * 本関数はprops.inProgressを変更する副作用がある
 * @param options オプション
 */
export async function gotoTitle(options: Options) {
  const { props } = options;
  props.domDialogBinder.hidden();
  props.suddenlyBattleEnd.unbind();
  props.rematchCancelled.unbind();
  const [title] = await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
    })(),
    (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })(),
    (async () => {
      if (
        props.inProgress.type === "PasswordMatchHost" &&
        props.inProgress.passwordMatchHost.type === "Rematch"
      ) {
        await props.inProgress.passwordMatchHost.rematchRoom.cancelRematch();
      } else if (
        props.inProgress.type === "PasswordMatchGuest" &&
        props.inProgress.passwordMatchGuest.type === "Rematch"
      ) {
        await props.inProgress.passwordMatchGuest.rematchRoom.cancelRematch();
      }
      await disconnectAll(props);
    })(),
  ]);
  title.startTitleBackgroundLoop();
  await props.fader.fadeIn();
  playTitleBGM(props);
  props.inProgress = { type: "None" };
}
