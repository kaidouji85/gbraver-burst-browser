import { BattleControllerTypeSchema } from "../../../../../src/js/game/config/parser/battle-controller-type";
import { BattleControllerTypes } from "../../../../../src/js/td-scenes/battle/controller-type";

test("BattleControllerTypesは正しくパースできる", () => {
  BattleControllerTypes.forEach((v) => {
    expect(BattleControllerTypeSchema.parse(v)).toBe(v);
  });
});

test("不正な文字列はパースできない", () => {
  const data = "NoDefinedControllerType";
  expect(() => BattleControllerTypeSchema.parse(data)).toThrow();
});

test("空文字はパースできない", () => {
  const data = "";
  expect(() => BattleControllerTypeSchema.parse(data)).toThrow();
});

test("nullはパースできない", () => {
  const data = null;
  expect(() => BattleControllerTypeSchema.parse(data)).toThrow();
});

test("undefinedはパースできない", () => {
  const data = undefined;
  expect(() => BattleControllerTypeSchema.parse(data)).toThrow();
});
