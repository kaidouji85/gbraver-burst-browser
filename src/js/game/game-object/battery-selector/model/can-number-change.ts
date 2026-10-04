import type { BatterySelectorModel } from "./index";

/**
 * 指定した値に変更できるか否かを判定する
 * @param model 判定対象モデル
 * @returns 判定結果、trueで変更できる
 */
export function canNumberChanged(
  model: BatterySelectorModel,
  value: number,
): boolean {
  return 0 <= value && value <= model.enableMaxBattery;
}
