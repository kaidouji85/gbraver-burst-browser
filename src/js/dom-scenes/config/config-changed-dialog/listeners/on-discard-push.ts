import { pop } from "../../../../dom/pop";
import { PushDOM } from "../../../../dom/push-dom";
import type { ConfigChangedDialogProps } from "../props";

/**
 * 破棄ボタンを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onDiscardPush(
  props: ConfigChangedDialogProps,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.sound.play();
    await pop(props.discard);
    props.discardStream.next();
  });
}
