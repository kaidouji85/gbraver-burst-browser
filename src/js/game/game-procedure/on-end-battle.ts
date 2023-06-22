import { parseBrowserConfig } from "../config/parser/browser-config";
import { EndBattle } from "../game-actions/end-battle";
import type { GameProps } from "../game-props";
import { executePostNPCBattleIfNeeded } from "./execute-post-npc-baattle-if-needed";
import { executePostNetBattleIfNeeded } from "./execute-post-net-battle-if-needed";
import { executePostTutorialBattleIfNeeded } from "./execute-post-tutorial-battle-if-needed";

/**
 * 戦闘画面のアニメーションタイムスケールを設定に反映する
 * @param props ゲームプロパティ
 * @param animationTimeScale 反映するタイムスケール
 */
const saveAnimationTimeScale = async (
  props: Readonly<GameProps>,
  animationTimeScale: number
) => {
  const origin = await props.config.load();
  await props.config.save(
    parseBrowserConfig({
      ...origin,
      battleAnimationTimeScale: animationTimeScale,
    })
  );
};

/**
 * 戦闘終了時の処理
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onEndBattle(
  props: GameProps,
  action: Readonly<EndBattle>
): Promise<void> {
  await saveAnimationTimeScale(props, action.animationTimeScale);
  const postNPCBattle = await executePostNPCBattleIfNeeded(props, action);
  if (postNPCBattle.isExecuted) {
    props.inProgress = postNPCBattle.inProgress;
    return;
  }

  const isPostNetBattleExecuted = await executePostNetBattleIfNeeded(props);
  if (isPostNetBattleExecuted) {
    return;
  }
  
  const isPostTutorialBattleExecuted = await executePostTutorialBattleIfNeeded(props, action);
  if (isPostTutorialBattleExecuted) {
    return;
  }
}
