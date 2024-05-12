import { StoryFn } from "@storybook/html";
import { ArmdozerIds } from "gbraver-burst-core";

import { StageTitle } from "../src/js/dom-scenes/stage-title";
import { domStub } from "./stub/dom-stub";

export default {
  title: "stage-title",
};

export const npcBattle: StoryFn = domStub((params) => {
  const scene = new StageTitle({
    ...params,
    level: 10,
    caption: ["敵より大きいバッテリーを出せ"],
    armdozerId: ArmdozerIds.NEO_LANDOZER,
  });
  return scene.getRootHTMLElement();
});
