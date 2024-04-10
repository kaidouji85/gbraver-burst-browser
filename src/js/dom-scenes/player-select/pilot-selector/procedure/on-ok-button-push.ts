import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { PilotSelectorProps } from "../props";

/**
 * OKボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onOkButtonPush(
  props: Readonly<PilotSelectorProps>,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    props.decideSound.sound.play();
    await pop(props.okButton);
    props.decide.next(props.pilotId);
  });
}
