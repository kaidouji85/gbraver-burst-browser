import { pop } from "../../../../dom/animation";
import type { ConfigChangedDialogProps } from "../props";
import {PushDOM} from "../../../../dom/push-dom";

/**
 * 設定変更受け入れボタンを押した時の処理
 *
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onAcceptPush(
  props: ConfigChangedDialogProps,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.pushButton.play();
    await pop(props.accept);
    props.acceptStream.next();
  });
}
