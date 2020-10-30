// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title/title";

export default {
  title: 'title'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new Title(resources);
  return scene.getRootHTMLElement();
});
