import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * QRコードリーダーのためにカメラを起動する
 * @param props プロパティ
 */
export async function startCamera(props: PrivateMatchQRCodeReaderProps) {
  const { video } = props;
  video.srcObject = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });
  video.setAttribute("playsinline", "");
  await video.play();
}
