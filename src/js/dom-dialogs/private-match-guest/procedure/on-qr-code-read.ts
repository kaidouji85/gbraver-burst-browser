import { waitAnimationFrame } from "../../../wait/wait-animation-frame";
import { waitTime } from "../../../wait/wait-time";
import { PrivateMatchGuestDialogProps } from "../props";
import { enableAllControllers } from "./enable-all-controllers";

/**
 * QRコード読み取りに成功した時の処理
 * @param props ダイアログプロパティ
 * @param roomID ルームID
 */
export function onQRCodeRead(
  props: PrivateMatchGuestDialogProps,
  roomID: string,
) {
  props.exclusive.execute(async () => {
    enableAllControllers(props);
    props.qrCodeReader.stop();
    await waitAnimationFrame();
    await waitTime(800);
    props.qrCodeReader.hidden();
    props.privateMatchStart.next(roomID);
  });
}
