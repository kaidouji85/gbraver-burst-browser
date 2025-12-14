import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { popBatteryButton } from "../animation/pop-battery-button";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { stopAttention } from "./stop-attention";

/**
 * 決定アニメーションを実行する
 * @param props プロパティ
 * @returns アニメーション
 */
export function decide(props: Readonly<BatterySelectorProps>): Animate {
  return onStart(() => {
    stopAttention(props);
  }).chain(popBatteryButton(props));
}
