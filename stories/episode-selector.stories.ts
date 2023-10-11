import { EpisodeSelector } from "../src/js/dom-scenes/episode-selector";
import { PathIds } from "../src/js/resource/path/ids";
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
      introduction: "導入",
      imageCutPathId: PathIds.IMAGE_CUT_BATTERY_SYSTEM,
    },
    {
      id: "02",
      type: "Episode",
      number: 2,
      title: "ゼロ防御は即死",
      introduction: "導入",
      imageCutPathId: PathIds.IMAGE_CUT_ZERO_DEFENSE,
    },
    {
      id: "03",
      type: "Episode",
      number: 3,
      title: "バーストで一発逆転",
      introduction: "導入",
      imageCutPathId: PathIds.IMAGE_CUT_BURST,
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
