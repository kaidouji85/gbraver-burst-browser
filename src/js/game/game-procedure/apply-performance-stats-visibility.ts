import { PerformanceStats } from "../../stats/performance-stats";
import { PerformanceStatsVisibility } from "../config/browser-config";
import { GameProps } from "../game-props";

/**
 * パフォーマンス統計を表示する
 * @param props ゲームプロパティ
 */
function visiblePerformanceStats(props: GameProps): void {
  if (!document.body) {
    return;
  }

  if (props.performanceStats) {
    return;
  }

  props.performanceStats = new PerformanceStats(props);
  document.body.appendChild(props.performanceStats.getRootHTMLElement());
}

/**
 * パフォーマンス統計を非表示にする
 * @param props ゲームプロパティ
 */
function hiddenPerformanceStats(props: GameProps): void {
  if (!document.body) {
    return;
  }

  if (!props.performanceStats) {
    return;
  }

  props.performanceStats.destructor();
  document.body.removeChild(props.performanceStats.getRootHTMLElement());
  props.performanceStats = null;
}

/**
 * パフォーマンス統計の表示状態を反映する
 * @param props ゲームプロパティ
 * @param statsVisibility パフォーマンス統計表示設定
 */
export function applyPerformanceStatsVisibility(
  props: GameProps,
  statsVisibility: PerformanceStatsVisibility,
): void {
  if (statsVisibility === "visible") {
    visiblePerformanceStats(props);
  } else {
    hiddenPerformanceStats(props);
  }
}
