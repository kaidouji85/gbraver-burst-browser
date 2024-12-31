import { StoryFn } from "@storybook/html";

import { EpisodeSelector } from "../src/js/dom-scenes/episode-selector";
import { EpisodesInDevelopment } from "../src/js/game/episodes";
import { domStub } from "./stub/dom-stub";

export default {
  title: "episode-selector",
};

/** シーン表示 */
export const scene: StoryFn = domStub((params) => {
  const scene = new EpisodeSelector({
    ...params,
    episodes: EpisodesInDevelopment,
  });
  scene.notifyPrev().subscribe(() => {
    console.log("prev");
  });
  scene.notifySelection().subscribe((stageSelect) => {
    console.log("stage-select", stageSelect);
  });
  return scene.getRootHTMLElement();
});
