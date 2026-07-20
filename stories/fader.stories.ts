import { delay } from "../src/js/animation/delay";
import { frontmostFader, rearmostFader } from "../src/js/game-object/fader";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "fader",
};

/** 最前面画面フェーダ */
export const frontmost = hudGameObjectStory((params) => {
  const vignette = frontmostFader({ ...params, isVisible: false });
  delay(1000)
    .chain(vignette.fadeOut())
    .chain(delay(1000))
    .chain(vignette.fadeIn())
    .chain(delay(1000))
    .loop();
  return [vignette.getObject3D()];
});

/** 最背面画面フェーダ */
export const rearmost = hudGameObjectStory((params) => {
  const vignette = rearmostFader({ ...params, isVisible: false });
  delay(1000)
    .chain(vignette.fadeOut())
    .chain(delay(1000))
    .chain(vignette.fadeIn())
    .chain(delay(1000))
    .loop();
  return [vignette.getObject3D()];
});
