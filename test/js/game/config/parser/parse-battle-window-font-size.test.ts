import { BattleWindowFontSizes } from "../../../../../src/js/game/config/browser-config";
import { parseBattleWindowFontSize } from "../../../../../src/js/game/config/parser/battle-window-font-size";

test("正しい値ならパースできる", () => {
  BattleWindowFontSizes.forEach((v) => {
    expect(parseBattleWindowFontSize(v)).toBe(v);
  });
});

test("正しくない値ならnullを返す", () => {
  expect(parseBattleWindowFontSize("Small")).toBe(null);
});

test("空文字ならnullを返す", () => {
  expect(parseBattleWindowFontSize("")).toBe(null);
});

test("nullならnullを返す", () => {
  expect(parseBattleWindowFontSize(null)).toBe(null);
});

test("undefinedならnullを返す", () => {
  expect(parseBattleWindowFontSize(undefined)).toBe(null);
});
