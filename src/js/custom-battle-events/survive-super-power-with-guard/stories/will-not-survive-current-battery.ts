import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";
import { SurviveSuperPowerWithGuardProps } from "../props";

/**
 * 現在のバッテリーだと負ける
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function willNotSurviveCurrentBattery(
  props: Readonly<CustomBattleEventProps & SurviveSuperPowerWithGuardProps>,
) {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「危ないところだった`],
    [
      `ライトが${wbr}フルバッテリーで${wbr}攻撃した${wbr}場合 このバッテリー${wbr}では負ける」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();
  invisibleAllMessageWindows(props);
}
