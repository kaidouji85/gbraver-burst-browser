import { extractRoomIDFromPrivateMatchQRCodeText } from "../../../src/js/qr-code/private-match-qr-code";

test("正しいプライベートマッチQRコードテキストなら、ルームIDを抽出できる", () => {
  const roomID = "tD0eDEtIFk2kGJzo6SiNY";
  const text = `gbraver-burst-private-match:${roomID}`;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(roomID);
});

test("プライベートマッチQRコードテキストなら、ルームIDが抽出できない", () => {
  const roomID = "tD0eDEtIFk2kGJzo6SiNY";
  const text = `invalid-gbraver-burst-private-match:${roomID}`;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(null);
});

test("スペースが前後に含まれていても、ルームIDが抽出できない", () => {
  const roomID = "tD0eDEtIFk2kGJzo6SiNY";
  const text = ` gbraver-burst-private-match:${roomID} `;
  expect(extractRoomIDFromPrivateMatchQRCodeText(text)).toBe(null);
});