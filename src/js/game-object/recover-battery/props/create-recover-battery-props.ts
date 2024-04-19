import { ResourcesContainer } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { RecoverBatterySounds } from "../sounds/recover-battery-sounds";
import { RecoverBatteryView } from "../view/recover-battery-view";
import { RecoverBatteryProps } from "./recover-battery-props";

/** RecoverBatteryProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & {
  /** ビュー */
  view: RecoverBatteryView;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * RecoverBatteryPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createRecoverBatteryProps(
  params: PropsCreatorParams,
): RecoverBatteryProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new RecoverBatterySounds(resources),
  };
}
