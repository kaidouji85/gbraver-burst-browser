import { EpisodeSelector } from "../src/js/dom-scenes/episode-selector";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
import {PathIds} from "../src/js/resource/path/ids";
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
      imageCutPath: resources.paths.find(v => v.id === PathIds.TUTORIAL_IMAGE_CUT_01)?.path ?? "",
    },
    {
      id: "02",
      type: "Episode",
      number: 2,
      title: "ゼロ防御は即死",
      introduction: "導入",
      imageCutPath: resources.paths.find(v => v.id === PathIds.TUTORIAL_IMAGE_CUT_02)?.path ?? "",
    },
    {
      id: "03",
      type: "Episode",
      number: 3,
      title: "バーストで一発逆転",
      introduction: "導入",
      imageCutPath: resources.paths.find(v => v.id === PathIds.TUTORIAL_IMAGE_CUT_03)?.path ?? "",
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
