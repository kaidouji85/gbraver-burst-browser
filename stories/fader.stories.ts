import { delay } from "../src/js/animation/delay";
import { deathAlertVignette } from "../src/js/game-object/fader";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "fader",
};

/** デスアラートビネット */
export const deathAlert = hudGameObjectStory((params) => {
  const vignette = deathAlertVignette({ ...params, isVisible: false });
  delay(1000)
    .chain(vignette.fadeOut())
    .chain(delay(1000))
    .chain(vignette.fadeIn())
    .chain(delay(1000))
    .loop();
  return [vignette.getObject3D()];
});
