import { EpisodeSelector } from "../src/js/dom-scenes/episode-selector";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "tutorial-selector",
};
export const scene: DOMStubStory = domStub((resources) => {
  const scene = new EpisodeSelector(resources, [
    {
      id: "01",
      type: "Beginner",
      title: "バッテリーシステム基礎",
    },
    {
      id: "02",
      type: "Intermediate",
      title: "ゼロ防御は即死",
    },
    {
      id: "03",
      type: "Advanced",
      title: "バースト基礎",
    },
  ]);
  scene.notifyPrev().subscribe(() => {
    console.log("prev");
  });
  scene.notifyStageSelection().subscribe((stageSelect) => {
    console.log("stage-select", stageSelect);
  });
  return scene.getRootHTMLElement();
});
