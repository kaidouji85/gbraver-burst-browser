// @flow
import { TutorialSelector } from "../src/js/dom-scenes/tutorial-selector/tutorial-selector";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "tutorial-selector",
};

export const scene: DOMStubStory = domStub((resources) => {
  const scene = new TutorialSelector(resources, [
    { id: "01", title: "バッテリーシステム基礎" },
    { id: "02", title: "ゼロ防御は即死" },
    { id: "03", title: "バースト基礎" },
  ]);
  scene.prevNotifier().subscribe(() => {
    console.log("prev");
  });
  scene.stageSelectNotifier().subscribe((stageSelect) => {
    console.log("stage-select", stageSelect);
  });
  return scene.getRootHTMLElement();
});
