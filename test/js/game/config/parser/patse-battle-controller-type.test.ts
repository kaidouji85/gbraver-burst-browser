import { parseBattleControllerType } from "../../../../../src/js/game/config/parser/battle-controller-type";
import { BattleControllerTypes } from "../../../../../src/js/td-scenes/battle/controller-type";
import {DefaultConfig} from "../../../../../src/js/game/config/default-config";

test("BattleControllerTypesは正しくパースできる", () => {
  BattleControllerTypes.forEach((type) => {
    expect(parseBattleControllerType(type)).toBe(type);
  });
});

test("不正な文字列はパースできないので、デフォルト値を返す", () => {
  const data = "NoDefinedControllerType";
  expect(parseBattleControllerType(data)).toBe(DefaultConfig.battleControllerType);
});

test("空文字はパースできないので、デフォルト値を返す", () => {
  const data = "";
  expect(parseBattleControllerType(data)).toBe(DefaultConfig.battleControllerType);
});

test("nullはパースできないので、デフォルト値を返す", () => {
  const data = null;
  expect(parseBattleControllerType(data)).toBe(DefaultConfig.battleControllerType);
});

test("undefinedはパースできないので、デフォルト値を返す", () => {
  const data = undefined;
  expect(parseBattleControllerType(data)).toBe(DefaultConfig.battleControllerType);
});
