/**
 * プライベートマットQRコード文字列を生成する
 * @param roomID ルームID
 * @returns 生成結果
 */
export const createPrivateMatchQRCodeStr = (roomID: string): string =>
  `gbraver-burst-private-match:${roomID}`;

/**
 * プライベートマッチQRコード
 * @param qrCodeStr
 */
export const extractRoomIDFromPrivateMatchQRCodeStr = (
  qrCodeStr: string,
): string | null => {
  const regExp = /^gbraver-burst-private-match:([A-Za-z0-9_-]+)$/;
  const matched = qrCodeStr.match(regExp);
  return matched?.at(1) ?? null;
};
