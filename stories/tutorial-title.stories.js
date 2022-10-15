// @flow
import {TutorialTitle} from "../src/js/game/dom-scenes/scene/tutorial-title";
import {domStub} from "./stub/dom-stub";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'tutorial-title'
};

export const scene: DOMStubStory = domStub(resources => {
  const scene = new TutorialTitle();
  return scene.getRootHTMLElement();
});