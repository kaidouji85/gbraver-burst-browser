import { pop } from "../../../../dom/animation";
import type { ConfigChangedDialogProps } from "../props";
import {PushDOM} from "../../../../dom/push-dom";

/**
 * 破棄ボタンを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onDiscardPush(
  props: ConfigChangedDialogProps,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.play();
    await pop(props.discard);
    props.discardStream.next();
  });
}
