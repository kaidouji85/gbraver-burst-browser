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
  // videoタグのplaysinline属性には値がないので、2番目の引数は空文字である
  video.setAttribute("playsinline", "");
  await video.play();
}
