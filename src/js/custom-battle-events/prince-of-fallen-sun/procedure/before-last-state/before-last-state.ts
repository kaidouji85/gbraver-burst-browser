import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { PrinceOfFallenSunProps } from "../../props";
import { PrinceOfFallenSunState } from "../../state";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: LastState & PrinceOfFallenSunProps,
): Promise<PrinceOfFallenSunState> {
  return props.eventState;
}
