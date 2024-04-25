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
    ["ツバサ", "「いいぞ シンヤ"],
    ["初めての実戦でパイロットスキルまで発動させたか"],
    [
      "パイロットスキルは一試合に一回だけ パイロット固有の能力を発動することができる",
    ],
    ["君のパイロットスキルはバッテリー2回復"],
    ["多くの状況で有利がとれる 汎用的かつ奇襲性も高いパイロットスキルだ"],
  ]);
  invisibleAllMessageWindows(props);
}
