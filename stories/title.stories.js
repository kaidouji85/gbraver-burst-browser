// @flow

import {domStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title";

export default {
  title: 'title'
};

export const Scene = domStub(resources => {
  const scene = new Title(resources);
  return scene.getRootHTMLElement();
});
