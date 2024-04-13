import { createInitialValue } from "../model/initial-value";
import { BatteryNumberView } from "../view/battery-number-view";
import { BatteryEnchantmentProps } from "./battery-number-props";

/** BatteryEnchantmentProps生成パラメータ */
type GenerateBatteryEnchantmentPropsParams = {
  /** ビュー */
  view: BatteryNumberView;
};

/**
 * BatteryEnchantmentPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したBatteryEnchantmentProps
 */
export function createBatteryNumberProps(
  params: GenerateBatteryEnchantmentPropsParams,
): BatteryEnchantmentProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
