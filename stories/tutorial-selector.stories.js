// @flow
import {TutorialSelector} from "../src/js/game/dom-scenes/tutorial-selector/tutorial-selector";
import {domStub} from "./stub/dom-stub";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'tutorial-selector',
};
export const scene: DOMStubStory = domStub(() => {
  const scene = new TutorialSelector();
  return scene.getRootHTMLElement();
});