import { PrivateMatchQRCodeReader } from "../src/js/dom-dialogs/private-match-guest/qr-code-reader";
import { waitTime } from "../src/js/wait/wait-time";
import { domStub } from "./stub/dom-stub";

export default {
  title: "private-match-qr-code-reader",
};

/** QRコードリーダー */
export const qrCodeReadr = domStub((params) => {
  const reader = new PrivateMatchQRCodeReader(params);
  reader.start();
  reader.notifyReadQRCode().subscribe(async (roomID) => {
    console.log("read QR code", roomID);
    reader.stop();
    await waitTime(500);
    reader.hidden();
  });
  reader.notifyClose().subscribe(() => {
    console.log("close");
    reader.hidden();
  });
  return reader.getRootHTMLElement();
});
