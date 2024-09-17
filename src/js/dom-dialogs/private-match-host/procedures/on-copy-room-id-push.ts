import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { PrivateMatchHostDialogProps } from "../props";
import { flashSuccessCopyRoomId } from "./flash-success-copy-room-id";

/**
 * ルームIDコピーが押されたときの処理
 * @param props プロパティ
 * @param action アクション
 */
export function onCopyRoomIdPush(
  props: PrivateMatchHostDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await Promise.all([
      pop(props.copyRoomID),
      navigator.clipboard.writeText(props.roomID),
    ]);
    flashSuccessCopyRoomId(props);
  });
}
