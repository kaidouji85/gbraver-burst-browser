import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「いいぞ${wbr} シンヤ`],
    [`初めての${wbr}実戦で${wbr}パイロットスキルまで${wbr}発動${wbr}させたか`],
    [
      `パイロットスキルは${wbr}一試合に${wbr}一回だけ${wbr} パイロット固有の${wbr}能力を${wbr}発動${wbr}することが${wbr}できる`,
    ],
    [`君の${wbr}パイロットスキルは${wbr}バッテリー3回復`],
    [
      `多くの状況で${wbr}有利がとれる${wbr} 汎用的かつ${wbr}奇襲性も${wbr}高い${wbr}パイロットスキルだ`,
    ],
  ]);
  invisibleAllMessageWindows(props);
}
