import { delay } from "../src/js/animation/delay";
import { onStart } from "../src/js/animation/on-start";
import { DeathAlert } from "../src/js/game-object/death-alert";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "death-alert",
};

/** プレイヤーデスアラート */
export const playerDeathAlert = hudGameObjectStory((params) => {
  const alert = new DeathAlert(params);
  delay(1000)
    .chain(onStart(() => alert.startPlayerAlert(200)))
    .chain(delay(3000))
    .chain(onStart(() => alert.stop(200)))
    .chain(delay(1000))
    .loop();
  return [alert.getObject3D()];
});

/** 敵デスアラート */
export const enemyDeathAlert = hudGameObjectStory((params) => {
  const alert = new DeathAlert(params);
  delay(1000)
    .chain(onStart(() => alert.startEnemyAlert(200)))
    .chain(delay(3000))
    .chain(onStart(() => alert.stop(200)))
    .chain(delay(1000))
    .loop();
  return [alert.getObject3D()];
});
