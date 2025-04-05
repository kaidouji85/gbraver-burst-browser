import { PostBattleAction } from "../../../game-actions/post-battle-action";
import { GameProps } from "../../../game-props";
import { gotoEnding } from "./goto-ending";
import { gotoEpisodeSelect } from "./goto-episode-select";
import { gotoTitle } from "./goto-title";
import { nextStage } from "./next-stage";
import { retry } from "./retry";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: Readonly<PostBattleAction>;
};

/**
 * 戦闘終了後アクション決定時の処理
 * 本関数にはpropsを変更する副作用を持つ
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onPostBattleAction(options: Options): Promise<void> {
  const { props, action } = options;
  const { postAction } = action;
  switch (postAction.type) {
    case "GotoTitle":
      await gotoTitle({ props, postAction });
      break;
    case "GotoEnding":
      await gotoEnding({ props, postAction });
      break;
    case "Retry":
      await retry({ props, postAction });
      break;
    case "NextStage":
      await nextStage({ props, postAction });
      break;
    case "GotoEpisodeSelect":
      await gotoEpisodeSelect({ props, postAction });
      break;
  }
}
