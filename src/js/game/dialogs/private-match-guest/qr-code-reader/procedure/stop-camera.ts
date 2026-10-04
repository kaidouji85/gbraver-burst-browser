import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * QRコード用のカメラを停止する
 * @param props
 */
export function stopCamera(props: PrivateMatchQRCodeReaderProps) {
  const { video } = props;
  if (video.srcObject instanceof MediaStream) {
    video.srcObject.getTracks().forEach((t) => {
      t.stop();
    });
  }
}
