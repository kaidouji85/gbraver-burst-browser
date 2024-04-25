import { isSoundConfigChanged } from "../config/config-changed";
import { ConfigChangeComplete } from "../game-actions/config-change-complete";
import type { GameProps } from "../game-props";
import { reflectPerformanceStatsVisibility } from "./reflect-performance-stats-visibility";
import { reflectSoundVolume } from "./reflect-sound-volume";
import { startTitle } from "./start-title";

/**
 * 設定変更完了時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export async function onConfigChangeComplete(
  props: Readonly<GameProps>,
  action: ConfigChangeComplete,
): Promise<void> {
  await props.fader.fadeOut();
  const origin = await props.config.load();
  if (isSoundConfigChanged(origin, action.config)) {
    await reflectSoundVolume(props, action.config);
  }

  if (
    origin.performanceStatsVisibility !==
    action.config.performanceStatsVisibility
  ) {
    reflectPerformanceStatsVisibility(
      props,
      action.config.performanceStatsVisibility,
    );
  }

  await props.config.save(action.config);
  await startTitle(props);
  await props.fader.fadeIn();
}
