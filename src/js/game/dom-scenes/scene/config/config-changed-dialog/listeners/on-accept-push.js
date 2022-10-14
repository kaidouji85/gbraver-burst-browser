// @flow
import {pop} from "../../../../../../dom/animation";
import type {PushDOM} from "../../../../../../dom/event-stream";
import type {ConfigChangedDialogProps} from "../props";

/**
 * 設定変更受け入れボタンを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onAcceptPush(props: ConfigChangedDialogProps, action: $ReadOnly<PushDOM>): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.play();
    await pop(props.accept);
    props.acceptStream.next();
  });
}