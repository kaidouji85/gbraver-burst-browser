import { StoryFn } from "@storybook/html";
import { ArmdozerIds } from "gbraver-burst-core";

import { MatchCard } from "../src/js/dom-scenes/match-card";
import { domStub } from "./stub/dom-stub";

export default {
  title: "match-card",
};

/** シーン表示 */
export const Scene: StoryFn = domStub((params) => {
  const scene = new MatchCard({
    ...params,
    player: ArmdozerIds.LIGHTNING_DOZER,
    enemy: ArmdozerIds.GENESIS_BRAVER,
    caption: "STAGE X",
  });
  scene.waitUntilLoaded().then(() => {
    console.log("load complete.");
  });
  return scene.getRootHTMLElement();
});
