import { GameAction } from "../../../game-actions";
import { PostBattleAction } from "../../../game-actions/post-battle-action";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress/in-progress";
import { gotoEndingIfNeeded } from "./goto-ending-if-needed";
import { gotoEpisodeIfNeeded } from "./goto-episode-if-needed";
import { gotoEpisodeSelectorIfNeeded } from "./goto-episode-selector-if-needed";
import { gotoNPCBattleStageIfNeeded } from "./goto-npc-battle-stage";
import { gotoTitleIfNeeded } from "./goto-title-if-needed";

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
async function onPostBattleAction(
  props: GameProps,
  action: PostBattleAction,
): Promise<void> {
  let updated: InProgress = props.inProgress;
  if (await gotoTitleIfNeeded(props, action)) {
    updated = { type: "None" };
  } else if (await gotoEndingIfNeeded(props, action)) {
    updated = { type: "None" };
  } else if (await gotoNPCBattleStageIfNeeded(props, action)) {
    updated = props.inProgress;
  } else if (await gotoEpisodeIfNeeded(props, action)) {
    updated = props.inProgress;
  } else if (await gotoEpisodeSelectorIfNeeded(props, action)) {
    updated = {
      type: "Story",
      story: { type: "EpisodeSelect" },
    };
  }
  props.inProgress = updated;
}

/** アクションタイプ */
const actionType = "PostBattleAction";

/** 戦闘終了後アクションのリスナーコンテナ */
export const postBattleActionContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onPostBattleAction(props, action);
  },
};
