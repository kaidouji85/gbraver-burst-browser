import { getInitialBattery } from "../../../../../src/js/td-scenes/battle/get-initial-battery";
test("選択可能なバッテリー上限が1以上の場合、バッテリーセレクタの初期値は1になる", () => {
  const result = getInitialBattery(4);
  expect(result).toBe(1);
});
test("選択可能なバッテリー上限が0の場合、バッテリーセレクタの初期値は0になる", () => {
  const result = getInitialBattery(0);
  expect(result).toBe(0);
});