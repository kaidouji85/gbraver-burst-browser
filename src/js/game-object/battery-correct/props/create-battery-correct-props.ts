import { initialValue } from "../model/initial-value";
import { BatteryCorrectView } from "../view/battery-correct-view";
import { BatteryCorrectProps } from "./battery-correct-props";

/** BatteryCorrectProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: BatteryCorrectView;
};

/**
 * BatteryCorrectPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createBatteryCorrectProps(
  params: PropsCreatorParams,
): BatteryCorrectProps {
  const { view } = params;
  return {
    model: initialValue(),
    view,
  };
}
