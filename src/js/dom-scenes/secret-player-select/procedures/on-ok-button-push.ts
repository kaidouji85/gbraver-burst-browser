import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { SecretPlayerSelectProps } from "../props";
import { createPlayerSelection } from "./create-player-selection";

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
  const playerSelection = createPlayerSelection(props);
  if (!playerSelection) {
    return;
  }

  props.exclusive.execute(async () => {
    props.pushButtonSound.sound.play();
    await pop(props.okButton);
    props.ok.next(playerSelection);
  });
}
