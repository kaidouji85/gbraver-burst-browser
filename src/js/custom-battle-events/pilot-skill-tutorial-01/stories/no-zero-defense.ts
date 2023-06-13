import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * 0防御は即死
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function noZeroDefense(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「0防御は即死 瞬殺されるところだったッス」"],
  ]);
}
