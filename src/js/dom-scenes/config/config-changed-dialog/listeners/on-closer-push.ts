import { pop } from "../../../../dom/animation";
import type { ConfigChangedDialogProps } from "../props";
import {PushDOM} from "../../../../dom/push-dom";

/**
 * クロージャを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: ConfigChangedDialogProps,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.changeValue.play();
    await pop(props.closer, 1.3);
    props.closeStream.next();
  });
}
