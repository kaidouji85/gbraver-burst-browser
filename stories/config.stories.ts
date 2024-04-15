import { createBGMManager } from "../src/js/bgm/bgm-manager";
import { Config } from "../src/js/dom-scenes/config";
import { ConfigChangedDialog } from "../src/js/dom-scenes/config/config-changed-dialog";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "config",
};

export const Scene: DOMStubStory = domStub((params,) => {
  const scene = new Config({
    ...params,
    config: {
      webGLPixelRatio: 2,
      battleAnimationTimeScale: 1,
      bgmVolume: 1,
      seVolume: 1,
      battleControllerType: "BigButton",
      performanceStatsVisibility: "hidden",
    },
  });
  scene.notifyPrev().subscribe(() => {
    console.log("prev");
  });
  scene.notifyConfigChanges().subscribe((config) => {
    console.log("config change");
    console.log(config);
  });
  return scene.getRootHTMLElement();
});

export const ConfigChanged: DOMStubStory = domStub(({resources, se}) => {
  const dialog = new ConfigChangedDialog(resources, se);
  dialog.show();
  dialog.notifyClosed().subscribe(() => {
    console.log("on close");
  });
  dialog.notifyDiscard().subscribe(() => {
    console.log("on discard");
  });
  dialog.notifyAcceptance().subscribe(() => {
    console.log("on accept");
  });
  return dialog.getRootHTMLElement();
});
