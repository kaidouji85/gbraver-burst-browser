import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../src/js/qr-code/private-match-qr-code";

test("ひらがな5文字は正しいフォーマットなので、ルームIDを抽出できる", () => {
  const roomID = "あかんやろ";
  const text = `gbraver-burst-private-match:${roomID}`;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(roomID);
});

test("ひらがな5文字以外は不正なフォーマットなので、ルームIDが抽出できない", () => {
  const roomID = "あかんやろがな";
  const text = `gbraver-burst-private-match:${roomID}`;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(null);
});

test("ルームIDが空文字だと、ルームIDが抽出できない", () => {
  const roomID = "";
  const text = `gbraver-burst-private-match:${roomID}`;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(null);
});

test("プレフィックスが不正なら、ルームIDが抽出できない", () => {
  const roomID = "あかんやろ";
  const text = `invalid-gbraver-burst-private-match:${roomID}`;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(null);
});

test("スペースが前後に含まれていても、ルームIDが抽出できない", () => {
  const roomID = "あかんやろ";
  const text = ` gbraver-burst-private-match:${roomID} `;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(null);
});
