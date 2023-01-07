import { TutorialTitle } from "../src/js/dom-scenes/tutorial-title";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "tutorial-title"
};
export const scene: DOMStubStory = domStub(resources => {
  const scene = new TutorialTitle({
    resources,
    title: ["バッテリーシステム", "基礎"],
    level: 1
  });
  return scene.getRootHTMLElement();
});