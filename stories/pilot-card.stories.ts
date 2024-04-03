import { PilotIds } from "gbraver-burst-core";

import { PilotCard } from "../src/js/dom-scenes/secret-player-select/pilot-card";
import { domStub } from "./stub/dom-stub";

export default {
  title: "pilot-card",
};

/** シンヤ */
export const shinya = domStub((resources) => {
  const card = new PilotCard(resources, PilotIds.SHINYA);
  return card.getRootHTMLElement();
});
