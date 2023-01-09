import type { CustomBattleEventProps } from "../td-scenes/battle/custom-battle-event";
import { waitTime } from "../wait/wait-time";

/**
 * 全メッセージウインドウを非表示にする
 *
 * @param props イベントプロパティ
 */
export function invisibleAllMessageWindows(
  props: CustomBattleEventProps
): void {
  props.view.dom.leftMessageWindow.visible(false);
  props.view.dom.rightMessageWindow.visible(false);
  props.view.dom.nearBatterySelectorMessageWindow.visible(false);
  props.view.dom.nearBurstButtonMessageWindow.visible(false);
  props.view.dom.nearPilotButtonMessageWindow.visible(false);
}

/**
 * 会話を仕切りなおす
 *
 * @param props イベントプロパティ
 * @param wait 待ち時間
 * @return 仕切り直しが完了したら発火するPromise
 */
export const refreshConversation = async (
  props: CustomBattleEventProps,
  wait = 200
) => {
  invisibleAllMessageWindows(props);
  await waitTime(wait);
};
