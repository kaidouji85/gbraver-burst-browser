import { wbr } from "../../../dom/wbr";
import { getMinimumSurvivableBattery } from "../../../npc/get-minimum-survivable-battery";
import { BattleSimulatorEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
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
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
) {
  const { player, enemy } = props;
  await waitTime(200);

  const minimumSurvivableBattery = getMinimumSurvivableBattery(
    player,
    enemy,
    enemy.armdozer.battery,
  );
  if (minimumSurvivableBattery.isExist) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(
      minimumSurvivableBattery.value,
    );
  }
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「危ないところだった`],
    [
      `ライトが${wbr}全力攻撃した${wbr}場合 もっと${wbr}バッテリーを${wbr}出さない${wbr}と負ける」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();
  invisibleAllMessageWindows(props);
}
