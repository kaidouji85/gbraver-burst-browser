import { ArmdozerIds } from "gbraver-burst-core";

import { ArmdozerCard } from "../src/js/dom-scenes/secret-player-select/armdozer-card";
import { domStub } from "./stub/dom-stub";

export default {
  title: "armdozer-card",
};

/** シンブレイバー */
export const shinBraver = domStub((resources) => {
  const card = new ArmdozerCard(resources, ArmdozerIds.SHIN_BRAVER);
  return card.getRootHTMLElement();
});
