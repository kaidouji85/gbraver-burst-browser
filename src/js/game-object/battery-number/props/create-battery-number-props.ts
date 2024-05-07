import { createInitialValue } from "../model/initial-value";
import { BatteryNumberView } from "../view/battery-number-view";
import { BatteryNumberProps } from "./battery-number-props";

/** BatteryNumberProps生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: BatteryNumberView;
};

/**
 * BatteryNumberPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成したBatteryNumberProps
 */
export function createBatteryNumberProps(
  params: PropsCreatorParams,
): BatteryNumberProps {
  const { view } = params;
  return {
    model: createInitialValue(),
    view,
  };
}
