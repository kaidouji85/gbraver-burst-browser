import { StatsVisibility } from "../../../../../src/js/game/config/browser-config";
import { parseStatsVisibility } from "../../../../../src/js/game/config/parser/stats-visibility";

const statsVisibilities: StatsVisibility[] = ["visible", "hidden"];

test("StatsVisibilityはパースできる", ()=> {
  statsVisibilities.forEach(statsVisibility => {
    expect(parseStatsVisibility(statsVisibility)).toBe(statsVisibility);
  })
});

test("空文字はパースできない", () => {
  const data = "";
  expect(parseStatsVisibility(data)).toBe(null);
});

test("nullはパースできない", () => {
  const data = null;
  expect(parseStatsVisibility(data)).toBe(null);
});

test("undefinedはパースできない", () => {
  const data = undefined;
  expect(parseStatsVisibility(data)).toBe(null);
});
