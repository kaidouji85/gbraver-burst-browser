import { StoryFn } from "@storybook/html";

import { PrivateMatchQRCodeReader } from "../src/js/dom-dialogs/private-match-guest/qr-code-reader";
import { domStub } from "./stub/dom-stub";

/** QRコードリーダー */
export const qrCodeReadr: StoryFn = domStub(() => {
  const reader = new PrivateMatchQRCodeReader();
  reader.start();
  return reader.getRootHTMLElement();
});
