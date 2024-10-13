import { BattleWindowFontSizes } from "../../../../../src/js/game/config/browser-config";
import { parseBattleWindowFontSize } from "../../../../../src/js/game/config/parser/battle-window-font-size";

test("BattleWindowFontSizesの値を正しくパースできる", () => {
  BattleWindowFontSizes.forEach((v) => {
    expect(parseBattleWindowFontSize(v)).toBe(v);
  });
});

test("無効な文字列 'Small' をパースするとnullを返す", () => {
  expect(parseBattleWindowFontSize("Small")).toBe(null);
});

test("空文字をパースするとnullを返す", () => {
  expect(parseBattleWindowFontSize("")).toBe(null);
});

test("nullをパースするとnullを返す", () => {
  expect(parseBattleWindowFontSize(null)).toBe(null);
});

test("undefinedをパースするとnullを返す", () => {
  expect(parseBattleWindowFontSize(undefined)).toBe(null);
});
