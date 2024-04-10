import { PushDOM } from "../../../../dom/push-dom";
import type { ConfigChangedDialogProps } from "../props";

/**
 * 背景を押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackGroundPush(
  props: ConfigChangedDialogProps,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    props.closeStream.next();
  });
}
