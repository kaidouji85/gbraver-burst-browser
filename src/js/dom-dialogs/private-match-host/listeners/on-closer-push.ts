import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { PrivateMatchHostDialogProps } from "../props";
import {prop} from "ramda";

/**
 * クロージャを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: PrivateMatchHostDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    action.event.stopPropagation();
    props.changeValue.sound.play();
    await pop(props.closer, 1.3);
  });
}
