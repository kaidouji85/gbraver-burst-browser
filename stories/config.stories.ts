import { Config } from "../src/js/dom-scenes/config";
import { ConfigChangedDialog } from "../src/js/dom-scenes/config/config-changed-dialog";
import { domStub } from "./stub/dom-stub";

export default {
  title: "config",
};

export const Scene = domStub((params) => {
  const scene = new Config({
    ...params,
    config: {
      playerSelectorType: "open",
      webGLPixelRatio: 2,
      battleAnimationTimeScale: 1,
      bgmVolume: 1,
      seVolume: 1,
      battleWindowFontSize: "normal",
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

export const ConfigChanged = domStub((params) => {
  const dialog = new ConfigChangedDialog(params);
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
