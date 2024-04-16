import { PlayerSelectorTypes } from "../../../../../src/js/game/config/browser-config";
import { parsePlayerSelectorType } from "../../../../../src/js/game/config/parser/player-selector-type";

test("有効なロボ、パイロット選択タイプはパースできる", () => {
  PlayerSelectorTypes.forEach((v) => {
    expect(parsePlayerSelectorType(v)).toBe(v);
  });
});

test("無効なロボ、パイロット選択タイプはパースできない", () => {
  expect(parsePlayerSelectorType("public")).toBe(null);
});

test("大文字、小文字の違いでもパースできない", () => {
  expect(parsePlayerSelectorType("Open")).toBe(null);
});

test("空文字はパースできない", () => {
  expect(parsePlayerSelectorType("")).toBe(null);
});

test("nullはパースできない", () => {
  expect(parsePlayerSelectorType(null)).toBe(null);
});

test("undefinedはパースできない", () => {
  expect(parsePlayerSelectorType(undefined)).toBe(null);
});
