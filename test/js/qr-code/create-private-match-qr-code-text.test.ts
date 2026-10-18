import { createPrivateMatchQRCodeText } from "../../../src/js/dom/qr-code/private-match-qr-code";

test("プライベートマッチQRコードテキストを正しく生成できる", () => {
  const roomID = "bz6KjC3p90gpVKsb05IdI";
  expect(createPrivateMatchQRCodeText(roomID)).toBe(
    `gbraver-burst-private-match:${roomID}`,
  );
});
