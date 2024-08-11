import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomBattleEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { PrinceOfFallenSunProps } from "../../props";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export function onStateAnimation(
  props: CustomBattleEventProps & PrinceOfFallenSunProps,
): Animate {
  return empty();
}
