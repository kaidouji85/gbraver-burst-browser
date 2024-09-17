import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * クローザーを押したときの処理
 * @param props プロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: PrivateMatchQRCodeReaderProps,
  action: PushDOM,
): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await pop(props.closer, 1.3);
    props.notificationOfClose.next();
  });
}
