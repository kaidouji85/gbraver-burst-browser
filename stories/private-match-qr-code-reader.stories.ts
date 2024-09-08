import { StoryFn } from "@storybook/html";

import { PrivateMatchQRCodeReader } from "../src/js/dom-dialogs/private-match-guest/qr-code-reader";
import { domStub } from "./stub/dom-stub";

export default {
  title: "private-match-qr-code-reader",
};

/** QRコードリーダー */
export const qrCodeReadr: StoryFn = domStub(() => {
  const reader = new PrivateMatchQRCodeReader();
  reader.start();
  reader.notifyReadQRCode().subscribe((roomID) => {
    console.log("read QR code", roomID);
    reader.stop();
  });
  return reader.getRootHTMLElement();
});
