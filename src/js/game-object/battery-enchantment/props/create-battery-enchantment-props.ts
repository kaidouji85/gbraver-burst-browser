import { Resources } from "../../../resource";
import { createInitialValue } from "../model/initial-value";
import { BatteryEnchantmentSounds } from "../sounds/battery-enchantment-sounds";
import { BatteryEnchantmentView } from "../view/battery-enchantment-view";
import { BatteryEnchantmentProps } from "./battery-enchantment-props";
import { SEPlayer } from "../../../se/se-player";

/** BatteryEnchantmentProps生成パラメータ */
export type GenerateBatteryEnchantmentPropsParams = {
  /** ビュー */
  view: BatteryEnchantmentView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * BatteryEnchantmentPropsを生成する
 * @param params 生成パラメータ
 * @return 生成したBatteryEnchantmentProps
 */
export function createBatteryEnchantmentProps(
  params: GenerateBatteryEnchantmentPropsParams,
): BatteryEnchantmentProps {
  const { view, resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    view,
    sounds: new BatteryEnchantmentSounds(resources),
  };
}
