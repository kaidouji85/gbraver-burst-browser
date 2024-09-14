/**
 * クロージャを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractCloser = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="closer"]`) ?? document.createElement("div");

/**
 * ルームID入力フォームを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractRoomID = (root: HTMLElement): HTMLInputElement => {
  const extractedRoomID = root.querySelector(`[data-id="roomID"]`);
  return extractedRoomID instanceof HTMLInputElement
    ? extractedRoomID
    : document.createElement("input");
};

/**
 * プライベートマッチ開始ボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractEnterButton = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="enterButton"]`) ??
  document.createElement("div");

/**
 * QRコードリーダーのダミーを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractDummyQRCodeReader = (root: HTMLElement): HTMLElement =>
  root.querySelector(`[data-id="dummy-qr-code-reader"]`) ??
  document.createElement("div");

/**
 * ダミーQRコードリーダーボタンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export const extractStartQRCodeReader = (
  root: HTMLElement,
): HTMLButtonElement => {
  const extractedStartQRCodeReader = root.querySelector(
    `[data-id="start-qr-code-reader"]`,
  );
  return extractedStartQRCodeReader instanceof HTMLButtonElement
    ? extractedStartQRCodeReader
    : document.createElement("button");
};
