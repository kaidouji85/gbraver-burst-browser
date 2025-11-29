import { all } from "../../../animation/all";
import { silentlyBatteryMinusPop } from "../animation/battery-minus-pop";
import { silentlyBatteryPlusPop } from "../animation/battery-plus-pop";
import { silentlyDecide } from "../animation/decide";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * 注目アニメーションを実行する
 * @param props プロパティ
 */
export function attention(props: Readonly<BatterySelectorProps>): void {
  all(
    silentlyBatteryPlusPop(props),
    silentlyBatteryMinusPop(props),
    silentlyDecide(props),
  ).loop(props.attentionTween);
}
