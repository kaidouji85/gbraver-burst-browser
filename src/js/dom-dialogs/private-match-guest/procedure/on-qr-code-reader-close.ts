import { PrivateMatchGuestDialogProps } from "../props";

/**
 * QRコードリーダーを閉じた際の処理
 * @param props プロパティ
 */
export function onQrCodeReaderClose(props: PrivateMatchGuestDialogProps) {
  props.exclusive.execute(async () => {
    props.qrCodeReader.stop();
    props.qrCodeReader.hidden();
  });
}
