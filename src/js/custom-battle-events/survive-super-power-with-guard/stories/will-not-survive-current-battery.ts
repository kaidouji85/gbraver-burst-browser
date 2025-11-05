import { wbr } from "../../../dom/wbr";
import { getMinimumSurvivableBattery } from "../../../npc/get-minimum-survivable-battery";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";
import { separatePlayers } from "../../separate-players";
import { SurviveSuperPowerWithGuardProps } from "../props";

const getDefenseBattery = (props: Readonly<CustomBattleEventProps>) => {
  const lastState = props.stateHistory.at(-1);
  if (!lastState) {
    return null;
  }

  const players = separatePlayers(props, lastState);
  if (!players) {
    return null;
  }

  const result = getMinimumSurvivableBattery(
    players.player,
    players.enemy,
    players.enemy.armdozer.battery,
  );

  return result.isExist ? result.value : null;
};

/**
 * 現在のバッテリーだと負ける
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function willNotSurviveCurrentBattery(
  props: Readonly<CustomBattleEventProps & SurviveSuperPowerWithGuardProps>,
) {
  await waitTime(200);
  const defenseBattery = getDefenseBattery(props);
  if (defenseBattery !== null) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(
      defenseBattery,
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
