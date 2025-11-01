import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";
import { SurviveSuperPowerWithGuardProps } from "../props";

/**
 * 現在のバッテリーで生き残れる
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function willSurviveCurrentBattery(
  props: Readonly<CustomBattleEventProps & SurviveSuperPowerWithGuardProps>,
) {
  await waitTime(200);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「これなら安心だ`],
    [
      `ライトが${wbr}全力攻撃しても この${wbr}バッテリーなら${wbr}死ぬ${wbr}ことはない」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();
  invisibleAllMessageWindows(props);
}
