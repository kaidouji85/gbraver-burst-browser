// @flow

import {domStub} from "./stub/dom-stub";
import {MatchCard} from "../src/js/game/dom-scenes/match-card";

export default {
  title: 'match-card'
};

export const Scene = domStub((resourcePath) => {
  const scene = new MatchCard(resourcePath);
  return scene.getRootHTMLElement();
});
