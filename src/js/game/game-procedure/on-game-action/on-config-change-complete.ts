import { ConfigChangeComplete } from "../../game-actions/config-change-complete";
import { GameProps } from "../../game-props";
import { applyBattleWindowFontSize } from "../apply-battle-window-font-size";
import { applyPerformanceStatsVisibility } from "../apply-performance-stats-visibility";
import { applySoundVolume } from "../apply-sound-volume";
import { startTitle } from "../start-title";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: ConfigChangeComplete;
};

/**
 * 設定変更完了時の処理
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onConfigChangeComplete(options: Options): Promise<void> {
  const { props, action } = options;
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
