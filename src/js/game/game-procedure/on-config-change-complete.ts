import { changeVolume } from "../../bgm/bgm-operators";
import { isSoundConfigChanged } from "../config/config-changed";
import { ConfigChangeComplete } from "../game-actions/config-change-complete";
import type { GameProps } from "../game-props";
import { reflectSEVolume } from "../reflect-se-volume";
import { reflectPerformanceStatsVisibility } from "./reflect-performance-stats-visibility";
import { startTitle } from "./start-title";

/**
 * 設定変更完了時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onConfigChangeComplete(
  props: Readonly<GameProps>,
  action: ConfigChangeComplete,
): Promise<void> {
  await props.fader.fadeOut();
  const origin = await props.config.load();
  if (isSoundConfigChanged(origin, action.config)) {
    reflectSEVolume(props.resources, action.config);
    await props.bgm.do(changeVolume(action.config.bgmVolume));
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
