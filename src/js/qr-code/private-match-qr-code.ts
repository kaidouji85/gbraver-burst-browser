import QRCode from "qrcode";

/**
 * プライベートマットQRコードに設定するテキストを生成する
 * @param roomID ルームID
 * @returns 生成結果
 */
export const createPrivateMatchQRCodeText = (roomID: string): string =>
  `gbraver-burst-private-match:${roomID}`;

/**
 * プライベートマッチQRコードをキャンバスに描画する
 * @param canvas 描画対象のキャンバス
 * @param roomID ルームID
 * @returns 処理結果
 */
export const drawPrivateMatchQRCode = async (
  canvas: HTMLCanvasElement,
  roomID: string,
) => {
  await QRCode.toCanvas(canvas, createPrivateMatchQRCodeText(roomID));
};

/**
 * 任意のQRコードテキストを受け取り、それがプライベートマッチQRコードである場合にルームIDを抽出する
 * フォーマットが違う場合はnullを返す
 * @param qrCodeStr QRコード文字列
 * @returns 抽出結果
 */
export const extractRoomIDFromPrivateMatchQRCodeText = (
  qrCodeStr: string,
): string | null => {
  const regExp = /^gbraver-burst-private-match:([A-Za-z0-9_-]+)$/;
  const matched = qrCodeStr.match(regExp);
  return matched?.at(1) ?? null;
};
