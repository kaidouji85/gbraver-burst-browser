import { waitAnimationFrame } from "../../../wait/wait-animation-frame";
import { PrivateMatchGuestDialogProps } from "../props";
import {waitTime} from "../../../wait/wait-time";

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
    props.qrCodeReader.stop();
    await waitAnimationFrame();
    await waitTime(800);
    props.roomID.value = roomID;
    props.qrCodeReader.hidden();
  });
}
