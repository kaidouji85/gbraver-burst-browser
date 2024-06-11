import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { focusInBatterySelector } from "../../focus";
import { BatterySystemTutorialProps } from "../props";
import { BatterySystemTutorialState } from "../state";
import { attackDescription } from "../stories/attack-description";

/**
 * 最終ステートイベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function onLastState(
  props: Readonly<LastState & BatterySystemTutorialProps>,
): Promise<BatterySystemTutorialState> {
  if (props.state.isBatterySystemDescriptionComplete) {
    return props.state;
  }

  const { lastState } = props;
  if (lastState.effect.name !== "InputCommand") {
    return props.state;
  }

  const isMyTurn = lastState.activePlayerId === props.playerId;
  if (isMyTurn) {
    await attackDescription(props, props.attackBatteryCaption);
  } else {
    await focusInBatterySelector(props);
    props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
      props.defenseBatteryCaption,
    );
  }

  return props.state;
}
