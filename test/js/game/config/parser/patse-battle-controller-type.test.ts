import { parseBattleControllerType } from "../../../../../src/js/game/config/parser/battle-controller-type";
import { BattleControllerTypes } from "../../../../../src/js/td-scenes/battle/controller-type";

test("BattleControllerTypesは正しくパースできる", () => {
  BattleControllerTypes.forEach((v) => {
    expect(parseBattleControllerType(v)).toBe(v);
  });
});

test("不正な文字列はパースできない", () => {
  const data = "NoDefinedControllerType";
  expect(parseBattleControllerType(data)).toBe(null);
});

test("空文字はパースできない", () => {
  const data = "";
  expect(parseBattleControllerType(data)).toBe(null);
});

test("nullはパースできない", () => {
  const data = null;
  expect(parseBattleControllerType(data)).toBe(null);
});

test("undefinedはパースできない", () => {
  const data = undefined;
  expect(parseBattleControllerType(data)).toBe(null);
});
