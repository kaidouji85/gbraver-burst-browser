import { pop } from "../../../dom/pop";
import { PrivateMatchHostDialogProps } from "../props";
import { flushSuccessCopyRoomId } from "./flush-success-copy-room-id";

/**
 * ルームIDコピーが押されたときの処理
 * @param props プロパティ
 */
export function onCopyRoomIdPush(props: PrivateMatchHostDialogProps): void {
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await Promise.all([
      pop(props.copyRoomID),
      navigator.clipboard.writeText(props.roomID),
    ]);
    flushSuccessCopyRoomId(props);
  });
}
