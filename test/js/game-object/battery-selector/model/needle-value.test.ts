import { getNeedleValue } from "../../../../../src/js/game-object/battery-selector/model/needle-value";

test("現在のバッテリー値 / バッテリー最大値 を返す", () => {
  const result = getNeedleValue(3, 5);
  expect(result).toBe(3 / 5);
});
