import { BattleWindowFontSizes } from "../../../../../src/js/game/config/browser-config";
import { BattleWindowFontSizeSchema } from "../../../../../src/js/game/config/parser/battle-window-font-size";

test("BattleWindowFontSizesの値を正しくパースできる", () => {
  BattleWindowFontSizes.forEach((v) => {
    expect(BattleWindowFontSizeSchema.parse(v)).toBe(v);
  });
});

test("無効な文字列 'Small' をパースするとエラーをスローする", () => {
  expect(() => BattleWindowFontSizeSchema.parse("Small")).toThrow();
});

test("空文字をパースするとエラーをスローする", () => {
  expect(() => BattleWindowFontSizeSchema.parse("")).toThrow();
});

test("nullをパースするとエラーをスローする", () => {
  expect(() => BattleWindowFontSizeSchema.parse(null)).toThrow();
});

test("undefinedをパースするとエラーをスローする", () => {
  expect(() => BattleWindowFontSizeSchema.parse(undefined)).toThrow();
});
