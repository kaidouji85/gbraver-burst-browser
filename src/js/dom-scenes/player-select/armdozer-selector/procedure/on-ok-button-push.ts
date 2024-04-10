import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { ArmdozerSelectorProps } from "../props";

/**
 * 決定ボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onOkButtonPush(
  props: Readonly<ArmdozerSelectorProps>,
  action: PushDOM,
) {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.decideSound.sound.play();
    await pop(props.okButton);
    props.decide.next(props.armdozerId);
  });
}
