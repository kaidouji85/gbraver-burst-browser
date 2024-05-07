import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { BatteryEnhancementSounds } from "../sounds/battery-enhancement-sounds";
import { BatteryEnhancementView } from "../view/battery-enhancement-view";
import { BatteryEnhancementProps } from "./battery-enhancement-props";

/** BatteryEnhancementProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: BatteryEnhancementView;
  };

/**
 * BatteryEnhancementPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createBatteryEnhancementProps(
  params: PropsCreatorParams,
): BatteryEnhancementProps {
  const { view, resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    view,
    sounds: new BatteryEnhancementSounds(resources),
  };
}
