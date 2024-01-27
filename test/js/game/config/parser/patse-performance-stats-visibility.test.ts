import { PerformanceStatsVisibility } from "../../../../../src/js/game/config/browser-config";
import { parsePerformanceStatsVisibility } from "../../../../../src/js/game/config/parser/performance-stats-visibility";

/** パフォーマンス統計表示設定をあつめたもの */
const performanceStatsVisibilities: PerformanceStatsVisibility[] = [
  "visible",
  "hidden",
];

test("PerformanceStatsVisibilityはパースできる", () => {
  performanceStatsVisibilities.forEach((statsVisibility) => {
    expect(parsePerformanceStatsVisibility(statsVisibility)).toBe(
      statsVisibility,
    );
  });
});

test("空文字はパースできない", () => {
  const data = "";
  expect(parsePerformanceStatsVisibility(data)).toBe(null);
});

test("nullはパースできない", () => {
  const data = null;
  expect(parsePerformanceStatsVisibility(data)).toBe(null);
});

test("undefinedはパースできない", () => {
  const data = undefined;
  expect(parsePerformanceStatsVisibility(data)).toBe(null);
});
