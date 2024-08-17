import { StateUpdateStarted } from "../../../../td-scenes/battle/custom-battle-event";
import { PrinceOfFallenSunProps } from "../../props";
import { PrinceOfFallenSunState } from "../../state";

/**
 * ステート更新が開始された時に呼ばれるイベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export function onStateUpdateStarted(
  props: StateUpdateStarted & PrinceOfFallenSunProps,
): PrinceOfFallenSunState {
  return props.eventState;
}
