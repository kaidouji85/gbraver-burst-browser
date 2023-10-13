import { PostBattleAction } from "../../game-actions/post-battle-action";
import { GameProps } from "../../game-props";
import { playTitleBGM } from "../play-title-bgm";
import { startEpisodeSelector } from "../start-episode-selector";

/**
 * 条件を満たした場合、エピソード選択画面に遷移する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 遷移した場合はtrue、遷移しなかった場合はfalse
 */
export async function gotoEpisodeSelectorIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<PostBattleAction>,
): Promise<boolean> {
  if (action.action.type !== "GotoEpisodeSelect") {
    return false;
  }

  props.domFloaters.hiddenPostBattle();
  await startEpisodeSelector(props);
  playTitleBGM(props);
  return true;
}
