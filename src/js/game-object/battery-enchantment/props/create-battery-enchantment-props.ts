import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { BatteryEnchantmentSounds } from "../sounds/battery-enchantment-sounds";
import { BatteryEnchantmentView } from "../view/battery-enchantment-view";
import { BatteryEnchantmentProps } from "./battery-enchantment-props";

/** BatteryEnchantmentProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: BatteryEnchantmentView;
  };

/**
 * BatteryEnchantmentPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したBatteryEnchantmentProps
 */
export function createBatteryEnchantmentProps(
  params: PropsCreatorParams,
): BatteryEnchantmentProps {
  const { view, resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    view,
    sounds: new BatteryEnchantmentSounds(resources),
  };
}
