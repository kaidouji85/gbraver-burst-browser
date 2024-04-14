import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { PilotSelectorProps } from "../props";

/**
 * 戻るボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPrevButtonPush(
  props: Readonly<PilotSelectorProps>,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.se.play(props.changeValueSound);
    await pop(props.prevButton);
    props.prev.next();
  });
}
