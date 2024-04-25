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
    ["ツバサ", "「もうパイロットスキルを発動できるとは 将来有望だな"],
    [
      "パイロットスキルは 一試合に一回だけパイロット固有のスキルを発動できるんだ",
    ],
    ["ちなみに君のパイロットスキルは バッテリー2回復だ」"],
  ]);
  invisibleAllMessageWindows(props);
}
