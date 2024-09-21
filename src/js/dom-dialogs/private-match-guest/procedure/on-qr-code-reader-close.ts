import { PrivateMatchGuestDialogProps } from "../props";
import { enableAllControllers } from "./enable-all-controllers";

/**
 * QRコードリーダーを閉じた際の処理
 * @param props プロパティ
 */
export function onQrCodeReaderClose(props: PrivateMatchGuestDialogProps) {
  props.exclusive.execute(async () => {
    enableAllControllers(props);
    props.qrCodeReader.stop();
    props.qrCodeReader.hidden();
  });
}
