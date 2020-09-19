// @flow

import {domStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'title'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new Title(resources);
  return scene.getRootHTMLElement();
});
