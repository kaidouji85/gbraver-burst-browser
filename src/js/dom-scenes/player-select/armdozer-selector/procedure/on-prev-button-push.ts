import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { ArmdozerSelectorProps } from "../props";

/**
 * 戻るボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPrevButtonPush(
  props: Readonly<ArmdozerSelectorProps>,
  action: PushDOM,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.se.play(props.changeValueSound);
    await pop(props.prevButton);
    props.prev.next();
  });
}
