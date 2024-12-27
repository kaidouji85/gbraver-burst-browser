import { Processor } from "glob/dist/commonjs/processor";
import { PostBattleAction } from "../../../game-actions/post-battle-action";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { gotoEnding } from "./goto-ending";
import { gotoEpisodeIfNeeded } from "./goto-episode-if-needed";
import { gotoEpisodeSelect } from "./goto-episode-select";
import { gotoNPCBattleStage } from "./goto-npc-battle-stage";
import { gotoTitle, gotoTitleIfNeeded } from "./goto-title";

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
  const { postAction } = action;
  props.inProgress = await (() => {
    switch (postAction.type) {
      case "GotoTitle":
        return gotoTitle({ props, postAction });
      case "GotoEnding":
        return gotoEnding({ props, postAction });
      case "NextStage":
      case "Retry":
        return gotoNPCBattleStage({ props, postAction });
      case "GotoEpisodeSelect":
        return gotoEpisodeSelect({ props, postAction });
      default:
        return props.inProgress;
    }
  })();

  /*
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
  */
}
