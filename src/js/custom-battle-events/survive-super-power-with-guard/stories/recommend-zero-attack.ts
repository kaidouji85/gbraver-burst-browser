import { wbr } from "../../../dom/wbr";
import { highlight } from "../../../game-dom/message-window/dom/highlight";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";
import { SurviveSuperPowerWithGuardProps } from "../props";

/**
 * ０攻撃の推奨
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function recommendZeroAttack(
  props: Readonly<CustomBattleEventProps & SurviveSuperPowerWithGuardProps>,
) {
  props.view.hud.gameObjects.batterySelector.toBatterySilently(0);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    [
      "ツバサ",
      `「あの図体${wbr}での${wbr}攻撃 まともに${wbr}くらえば${wbr}即死だ`,
    ],
    [
      `ここは${wbr}${highlight("0攻撃")}${wbr}して 次のターンの${wbr}${highlight(`防御バッテリーを${wbr}確保`)}${wbr}しよう」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();
  invisibleAllMessageWindows(props);
}
