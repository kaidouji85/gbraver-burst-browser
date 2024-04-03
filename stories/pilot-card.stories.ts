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

/** ツバサ */
export const tsubasa = domStub((resources) => {
  const card = new PilotCard(resources, PilotIds.TSUBASA);
  return card.getRootHTMLElement();
});

/** ガイ */
export const gai = domStub((resources) => {
  const card = new PilotCard(resources, PilotIds.GAI);
  return card.getRootHTMLElement();
});

/** ライト */
export const raito = domStub((resources) => {
  const card = new PilotCard(resources, PilotIds.RAITO);
  return card.getRootHTMLElement();
});

/** ユウヤ */
export const yuuya = domStub((resources) => {
  const card = new PilotCard(resources, PilotIds.YUUYA);
  return card.getRootHTMLElement();
});
