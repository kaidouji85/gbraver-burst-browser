import { StoryFn } from "@storybook/html";
import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { SecretPlayerSelect } from "../src/js/dom-scenes/secret-player-select";
import { domStub } from "./stub/dom-stub";

export default {
  title: "secret-player-select",
};

/** シーン通常表示 */
export const scene: StoryFn = domStub((params) => {
  const scene = new SecretPlayerSelect({
    ...params,
    armdozerIds: [
      ArmdozerIds.SHIN_BRAVER,
      ArmdozerIds.WING_DOZER,
      ArmdozerIds.NEO_LANDOZER,
      ArmdozerIds.LIGHTNING_DOZER,
      ArmdozerIds.GENESIS_BRAVER,
    ],
    pilotIds: [
      PilotIds.SHINYA,
      PilotIds.TSUBASA,
      PilotIds.GAI,
      PilotIds.RAITO,
      PilotIds.YUUYA,
    ],
  });
  scene.notifyOK().subscribe((selection) => {
    console.log("ok", selection);
  });
  scene.notifyPrev().subscribe(() => {
    console.log("prev");
  });
  return scene.getRootHTMLElement();
});
