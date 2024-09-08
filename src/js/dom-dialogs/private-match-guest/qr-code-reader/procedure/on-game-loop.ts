import jsQR from "jsqr";

import { PrivateMatchQRCodeReaderProps } from "../props";

/**
 * ゲームループ内での処理を行う
 * @param props プロパティ
 */
export function onUpdate(props: PrivateMatchQRCodeReaderProps) {
  const { root, canvas, video } = props;
  if (video.readyState !== video.HAVE_ENOUGH_DATA) {
    return;
  }

  root.height = video.videoHeight;
  root.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, root.width, root.height);
  const imageData = canvas.getImageData(0, 0, root.width, root.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height, {
    inversionAttempts: "dontInvert",
  });
  console.log(code?.data); // TODO 開発が終わったら削除する
}
