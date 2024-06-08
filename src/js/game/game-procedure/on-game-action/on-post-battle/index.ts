import { PostBattleAction } from "../../../game-actions/post-battle-action";
import { GameProps } from "../../../game-props";
import { gotoEndingIfNeeded } from "./goto-ending-if-needed";
import { gotoEpisodeIfNeeded } from "./goto-episode-if-needed";
import { gotoEpisodeSelectorIfNeeded } from "./goto-episode-selector-if-needed";
import { gotoNPCBattleStageIfNeeded } from "./goto-npc-battle-stage";
import { gotoTitleIfNeeded } from "./goto-title-if-needed";

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export async function onPostBattleAction(
  props: GameProps,
  action: PostBattleAction,
): Promise<void> {
  if (await gotoTitleIfNeeded(props, action)) {
    props.inProgress = {
      type: "None",
    };
    return;
  }

  if (await gotoEndingIfNeeded(props, action)) {
    props.inProgress = {
      type: "None",
    };
    return;
  }

  if (await gotoNPCBattleStageIfNeeded(props, action)) {
    return;
  }

  if (await gotoEpisodeIfNeeded(props, action)) {
    return;
  }

  if (await gotoEpisodeSelectorIfNeeded(props, action)) {
    props.inProgress = {
      type: "Story",
      story: {
        type: "EpisodeSelect",
      },
    };
    return;
  }
}
