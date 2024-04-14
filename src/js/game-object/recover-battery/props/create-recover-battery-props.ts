import { Resources } from "../../../resource";
import { createInitialValue } from "../model/initial-value";
import { RecoverBatterySounds } from "../sounds/recover-battery-sounds";
import { RecoverBatteryView } from "../view/recover-battery-view";
import { RecoverBatteryProps } from "./recover-battery-props";

/** RecoverBatteryProps生成パラメータ */
export type GenerateRecoverBatteryPropsParams = {
  /** ビュー */
  view: RecoverBatteryView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * RecoverBatteryPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createRecoverBatteryProps(
  params: GenerateRecoverBatteryPropsParams,
): RecoverBatteryProps {
  const { view, resources } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new RecoverBatterySounds(resources),
  };
}
