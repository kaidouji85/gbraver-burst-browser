import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ガイの視察
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function gaiInspecting(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [["ガイ", "「何とか最前列まで来れたな"]]);
  await scrollRightMessages(props, [
    ["シンヤ お前の強さの秘訣 絶対にあばいみせる」"],
  ]);
}
