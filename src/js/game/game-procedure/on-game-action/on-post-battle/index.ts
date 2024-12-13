import { PostBattleAction } from "../../../game-actions/post-battle-action";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { gotoEndingIfNeeded } from "./goto-ending-if-needed";
import { gotoEpisodeIfNeeded } from "./goto-episode-if-needed";
import { gotoEpisodeSelectorIfNeeded } from "./goto-episode-selector-if-needed";
import { gotoNPCBattleStageIfNeeded } from "./goto-npc-battle-stage-if-needed";
import { gotoTitleIfNeeded } from "./goto-title-if-needed";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: Readonly<PostBattleAction>;
};

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onPostBattleAction(options: Options): Promise<void> {
  const { props, action } = options;
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
