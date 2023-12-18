import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * 3以上で攻撃する
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function shouldAttack3OrMore(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [["ツバサ", "「よし 次は3以上で攻撃だ」"]]);
  invisibleAllMessageWindows(props);
}
