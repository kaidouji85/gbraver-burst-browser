import {GameProps} from "../../game-props";
import {PostBattleAction} from "../../game-actions/post-battle-action";
import {startTitle} from "../start-title";
import {fadeOut, stop} from "../../../bgm/bgm-operators";
import {playTitleBGM} from "../play-title-bgm";

/**
 * 条件を満たしていればタイトルに遷移する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 遷移した場合はtrue、遷移しなかった場合はfalse
 */
export async function gotoTitleIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<PostBattleAction>,
): Promise<boolean> {
  if(action.action.type === "GotoTitle") {
    return false;
  }

  props.domFloaters.hiddenPostBattle();
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
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