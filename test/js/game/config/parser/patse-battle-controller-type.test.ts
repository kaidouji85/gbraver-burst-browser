import {BattleControllerType} from "../../../../../src/js/td-scenes/battle/controller-type";
import {parseBattleControllerType} from "../../../../../src/js/game/config/parser/battle-controller-type";

test("BigButtonはそのまま", () => {
  const data: BattleControllerType = "BigButton";
  expect(parseBattleControllerType(data)).toBe(data);
});

test("MiniControllerはそのまま", () => {
  const data: BattleControllerType = "MiniController";
  expect(parseBattleControllerType(data)).toBe(data);
});

test("文字列でも不正なものはパースできない", () => {
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
