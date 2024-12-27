import { parseBrowserConfig } from "../../../config/parser/browser-config";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { executePostEpisodeIfNeeded } from "./execute-post-episode-if-needed";
import { executePostNetBattleIfNeeded } from "./execute-post-net-battle-if-needed";
import { executePostNPCBattleIfNeeded } from "./execute-post-npc-baattle-if-needed";

type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: Readonly<EndBattle>;
};

/**
 * 戦闘終了時の処理
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onEndBattle(options: Options): Promise<void> {
  const { props, action } = options;
  const config = await props.config.load();
  await props.config.save(
    parseBrowserConfig({
      ...config,
      battleAnimationTimeScale: action.animationTimeScale,
    }),
  );
  const postNPCBattle = await executePostNPCBattleIfNeeded(props, action);
  if (postNPCBattle.isExecuted) {
    props.inProgress = postNPCBattle.inProgress;
    return;
  }

  if (await executePostNetBattleIfNeeded(props)) {
    return;
  }

  if (await executePostEpisodeIfNeeded(props, action)) {
    return;
  }
}
