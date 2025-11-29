import { all } from "../../../animation/all";
import { delay } from "../../../animation/delay";
import { popBatteryButtonSilently } from "../animation/pop-battery-button";
import { popBatteryMinusSilently } from "../animation/pop-battery-minus";
import { popBatteryPlusSilently } from "../animation/pop-battery-plus";
import { BatterySelectorProps } from "../props/battery-selector-props";

/**
 * 注目アニメーションを実行する
 * @param props プロパティ
 */
export function attention(props: Readonly<BatterySelectorProps>): void {
  all(
    popBatteryPlusSilently(props),
    popBatteryMinusSilently(props),
    popBatteryButtonSilently(props, 1.05),
  )
    .chain(delay(1000))
    .loop(props.attentionTween);
}
