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
    [
      "ツバサ",
      `「いま${wbr}君が${wbr}発動したのは${wbr}パイロットスキルと${wbr}いい`,
    ],
    [
      `一試合に${wbr}一回だけ${wbr} パイロット${wbr}固有の${wbr}効果を${wbr}得ることが${wbr}できる`,
    ],
    [`ちなみに${wbr}君のパイロットスキルは${wbr}バッテリー${wbr}3回復だ」`],
  ]);
  invisibleAllMessageWindows(props);
}
