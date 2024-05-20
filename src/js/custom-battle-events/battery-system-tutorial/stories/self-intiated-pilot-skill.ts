import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * プレイヤーが自主的にパイロットスキルを発動した
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function selfInitiatedPilotSkill(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「もうパイロットスキルを<wbr>発動できるとは<wbr> 将来有望だな"],
    [
      "パイロットスキルは<wbr>一試合に<wbr>一回だけ<wbr>パイロット<wbr>固有のスキルを<wbr>発動できるんだ",
    ],
    ["ちなみに<wbr>君のパイロットスキル<wbr>は バッテリー<wbr>2回復だ」"],
  ]);
  invisibleAllMessageWindows(props);
}
