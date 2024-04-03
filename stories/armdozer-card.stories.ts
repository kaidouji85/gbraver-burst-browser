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

/** ウィングドーザ */
export const wingDozer = domStub((resources) => {
  const card = new ArmdozerCard(resources, ArmdozerIds.WING_DOZER);
  return card.getRootHTMLElement();
});

/** ネオランドーザ */
export const neoLandozer = domStub((resources) => {
  const card = new ArmdozerCard(resources, ArmdozerIds.NEO_LANDOZER);
  return card.getRootHTMLElement();
});

/** ライトニングドーザ */
export const lightningDozer = domStub((resources) => {
  const card = new ArmdozerCard(resources, ArmdozerIds.LIGHTNING_DOZER);
  return card.getRootHTMLElement();
});

/** ジェネシスブレイバー */
export const genesisBraver = domStub((resources) => {
  const card = new ArmdozerCard(resources, ArmdozerIds.GENESIS_BRAVER);
  return card.getRootHTMLElement();
});
