import { PostBattleAction } from "../../game-actions/post-battle-action";
import { GameProps } from "../../game-props";
import { gotoEndingIfNeeded } from "./goto-ending-if-needed";
import { gotoNPCBattleStageIfNeeded } from "./goto-npc-battle-stage";
import { gotoTitleIfNeeded } from "./goto-title-if-needed";
import { gotoTutorialIfNeeded } from "./goto-tutorial-if-needed";
import { gotoTutorialSelectorIfNeeded } from "./goto-tutorial-selector-if-needed";

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onPostBattleAction(
  props: GameProps,
  action: PostBattleAction,
): Promise<void> {
  const isGotoTitleExecuted = await gotoTitleIfNeeded(props, action);
  if (isGotoTitleExecuted) {
    props.inProgress = {
      type: "None",
    };
    return;
  }

  const isGotoEndingExecuted = await gotoEndingIfNeeded(props, action);
  if (isGotoEndingExecuted) {
    props.inProgress = {
      type: "None",
    };
    return;
  }

  const isGotoNPCBattleStageExecuted = await gotoNPCBattleStageIfNeeded(
    props,
    action,
  );
  if (isGotoNPCBattleStageExecuted) {
    return;
  }

  const isGotoTutorialExecuted = await gotoTutorialIfNeeded(props, action);
  if (isGotoTutorialExecuted) {
    return;
  }

  const isGotoTutorialSelectorExecuted = await gotoTutorialSelectorIfNeeded(
    props,
    action,
  );
  if (isGotoTutorialSelectorExecuted) {
    props.inProgress = {
      type: "Story",
      story: {
        type: "EpisodeSelect",
      },
    };
    return;
  }
}
