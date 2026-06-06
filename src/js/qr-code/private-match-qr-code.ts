import QRCode from "qrcode";

/**
 * プライベートマットQRコードに設定するテキストを生成する
 * @param roomID ルームID
 * @returns 生成結果
 */
export const createPrivateMatchQRCodeText = (roomID: string): string =>
  `gbraver-burst-private-match:${roomID}`;

/**
 * プライベートマッチQRコードを描画する
 * @param img 描画対象
 * @param roomID ルームID
 * @returns 処理結果
 */
export const drawPrivateMatchQRCode = async (
  img: HTMLImageElement,
  roomID: string,
) => {
  const svg = await QRCode.toString(createPrivateMatchQRCodeText(roomID), {
    type: "svg",
  });
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/**
 * 任意のQRコードテキストを受け取り、それがプライベートマッチQRコードである場合にルームIDを抽出する
 * 現状ではひらがな5文字がルームIDとして正しいフォーマットである
 * フォーマットが違う場合はnullを返す
 * @param qrCodeStr QRコード文字列
 * @returns 抽出結果
 */
export const extractRoomIDFromPrivateMatchQRCodeText = (
  qrCodeStr: string,
): string | null => {
  const regExp = /^gbraver-burst-private-match:([ぁ-ん]{5})$/;
  const matched = qrCodeStr.match(regExp);
  return matched?.at(1) ?? null;
};
