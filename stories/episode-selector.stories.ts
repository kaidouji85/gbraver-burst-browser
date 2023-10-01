import { EpisodeSelector } from "../src/js/dom-scenes/episode-selector";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "episode-selector",
};
export const scene: DOMStubStory = domStub((resources) => {
  const scene = new EpisodeSelector(resources, [
    {
      id: "01",
      type: "Episode",
      number: 1,
      title: "バッテリーシステム基礎",
    },
    {
      id: "02",
      type: "Episode",
      number: 2,
      title: "ゼロ防御は即死",
    },
    {
      id: "03",
      type: "Episode",
      number: 3,
      title: "バーストで一発逆転",
    },
  ]);
  scene.notifyPrev().subscribe(() => {
    console.log("prev");
  });
  scene.notifySelection().subscribe((stageSelect) => {
    console.log("stage-select", stageSelect);
  });
  return scene.getRootHTMLElement();
});
