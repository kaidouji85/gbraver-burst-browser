import { waitTime } from "../src/js/event/wait/wait-time";
import { PrivateMatchQRCodeReader } from "../src/js/game/dialogs/private-match-guest/qr-code-reader";
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
