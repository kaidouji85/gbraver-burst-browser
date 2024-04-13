import { initialValue } from "../model/initial-value";
import { BatteryCorrectView } from "../view/battery-correct-view";
import { BatteryCorrectProps } from "./battery-correct-props";

/** BatteryCorrectProps生成パラメータ */
export type GenerateBatteryCorrectPropsParams = {
  /** ビュー */
  view: BatteryCorrectView;
};

/**
 * BatteryCorrectPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createBatteryCorrectProps(
  params: GenerateBatteryCorrectPropsParams,
): BatteryCorrectProps {
  const { view } = params;
  return {
    model: initialValue(),
    view,
  };
}
