import { createInitialValue } from "../model/initial-value";
import { BatteryNumberView } from "../view/battery-number-view";
import { BatteryNumberProps } from "./battery-number-props";

/** BatteryEnchantmentProps生成パラメータ */
export type GenerateBatteryNumberPropsParams = {
  /** ビュー */
  view: BatteryNumberView;
};

/**
 * BatteryEnchantmentPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したBatteryEnchantmentProps
 */
export function createBatteryNumberProps(
  params: GenerateBatteryNumberPropsParams,
): BatteryNumberProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}