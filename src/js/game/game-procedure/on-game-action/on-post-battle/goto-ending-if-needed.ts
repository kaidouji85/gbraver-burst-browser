import { MAX_LOADING_TIME } from "../../../../dom-scenes/dom-scene-binder/max-loading-time";
import { NPCEnding } from "../../../../dom-scenes/npc-ending";
import { waitTime } from "../../../../wait/wait-time";
import { npcEndingConnector } from "../../../action-connector/npc-ending-connector";
import { PostBattleAction } from "../../../game-actions/post-battle-action";
import { GameProps } from "../../../game-props";

/**
 * 条件を満たした場合、エンディングに遷移する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 遷移した場合はtrue、遷移しなかった場合はfalse
 */
export async function gotoEndingIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<PostBattleAction>,
): Promise<boolean> {
  if (action.action.type !== "GotoEnding") {
    return false;
  }

  props.domFloaters.hiddenPostBattle();
  await props.fader.fadeOut();
  props.tdBinder.hidden();
  const scene = new NPCEnding(props);
  props.domSceneBinder.bind(scene, npcEndingConnector(props));
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  await props.fader.fadeIn();
  scene.playBGM();
  return true;
}
