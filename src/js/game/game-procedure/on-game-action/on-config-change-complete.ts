import { GameAction } from "../../game-actions";
import { ConfigChangeComplete } from "../../game-actions/config-change-complete";
import { GameProps } from "../../game-props";
import { applyBattleWindowFontSize } from "../apply-battle-window-font-size";
import { applyPerformanceStatsVisibility } from "../apply-performance-stats-visibility";
import { applySoundVolume } from "../apply-sound-volume";
import { startTitle } from "../start-title";

/**
 * 設定変更完了時の処理
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
async function onConfigChangeComplete(
  props: Readonly<GameProps>,
  action: ConfigChangeComplete,
): Promise<void> {
  await props.fader.fadeOut();
  await applySoundVolume(props, action.config);
  applyPerformanceStatsVisibility(
    props,
    action.config.performanceStatsVisibility,
  );
  applyBattleWindowFontSize(action.config.battleWindowFontSize);
  await props.config.save(action.config);
  await startTitle(props);
  await props.fader.fadeIn();
}

/** アクションタイプ */
const actionType = "ConfigChangeComplete";

/** 設定変更完了時のイベントリスナーコンテナ */
export const configChangeCompleteContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onConfigChangeComplete(props, action);
    }
  },
};
