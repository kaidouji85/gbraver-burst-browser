import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { SecretPlayerSelectProps } from "../props";

/**
 * 決定ボタンが押された際の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export async function onOKButtonPush(
  props: SecretPlayerSelectProps,
  action: PushDOM,
) {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButtonSound.sound.play();
    await pop(props.okButton);
  });
}
