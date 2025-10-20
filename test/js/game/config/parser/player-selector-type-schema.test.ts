import { PlayerSelectorTypes } from "../../../../../src/js/game/config/browser-config";
import { PlayerSelectorTypeSchema } from "../../../../../src/js/game/config/parser/player-selector-type";

test("有効なロボ、パイロット選択タイプはパースできる", () => {
  PlayerSelectorTypes.forEach((v) => {
    expect(PlayerSelectorTypeSchema.parse(v)).toBe(v);
  });
});

test("無効なロボ、パイロット選択タイプはパースできない", () => {
  expect(() => PlayerSelectorTypeSchema.parse("public")).toThrow();
});

test("大文字、小文字の違いでもパースできない", () => {
  expect(() => PlayerSelectorTypeSchema.parse("Open")).toThrow();
});

test("空文字はパースできない", () => {
  expect(() => PlayerSelectorTypeSchema.parse("")).toThrow();
});

test("nullはパースできない", () => {
  expect(() => PlayerSelectorTypeSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => PlayerSelectorTypeSchema.parse(undefined)).toThrow();
});
