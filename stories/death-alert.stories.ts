import { delay } from "../src/js/animation/delay";
import { onStart } from "../src/js/animation/on-start";
import { DeathAlert } from "../src/js/game-object/death-alert";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "death-alert",
};

/** デスアラート */
export const deathAlert = hudGameObjectStory((params) => {
  const alert = new DeathAlert(params);
  delay(1000)
    .chain(onStart(() => alert.show(200)))
    .chain(delay(1000))
    .chain(onStart(() => alert.hidden(200)))
    .chain(delay(1000))
    .loop();
  return [alert.getObject3D()];
});
