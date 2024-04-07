import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { SecretPlayerSelectProps } from "../props";

/**
 * 戻るボタンが押された際の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export async function onPrevButtonPush(
  props: SecretPlayerSelectProps,
  action: PushDOM,
) {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.changeValueSound.sound.play();
  await pop(props.prevButton);
}
