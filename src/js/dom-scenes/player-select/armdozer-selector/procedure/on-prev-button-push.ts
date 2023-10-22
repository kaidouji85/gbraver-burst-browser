import {ArmdozerSelectorProps} from "../props";
import {PushDOM} from "../../../../dom/push-dom";
import {pop} from "../../../../dom/pop";

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
    props.changeValueSound.play();
    await pop(props.prevButton);
    props.prev.next();
  });
}