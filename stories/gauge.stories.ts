import { StoryFn } from "@storybook/html";

import { all } from "../src/js/animation/all";
import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import { enemyGauge, playerGauge } from "../src/js/game-object/gauge";
import { Gauge } from "../src/js/game-object/gauge/gauge";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "gauge",
};

/**
 * ゲージ変更
 * @param gauge ゲージ
 */
function gaugeChange(gauge: Gauge): Animate {
  return delay(1000)
    .chain(gauge.hp(1000))
    .chain(gauge.battery(2))
    .chain(delay(1000))
    .chain(gauge.hp(300))
    .chain(gauge.battery(0))
    .chain(delay(1000))
    .chain(gauge.hp(3100))
    .chain(gauge.battery(5));
}

/**
 * 最大バッテリー変更
 * @param gauge ゲージ
 */
function maxBatteryChange(gauge: Gauge): Animate {
  return delay(1000)
    .chain(gauge.battery(1))
    .chain(delay(1000))
    .chain(all(gauge.battery(8), gauge.maxBattery(8)))
    .chain(delay(1000))
    .chain(gauge.battery(3))
    .chain(delay(1000))
    .chain(all(gauge.battery(4), gauge.maxBattery(4)))
    .chain(delay(1000));
}

/** ゲージ プレイヤー側 */
export const player: StoryFn = hudGameObjectStory(
  ({ resources, gameObjectAction }) => {
    const gauge = playerGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 5,
    });
    gaugeChange(gauge).loop();
    return [gauge.getObject3D()];
  },
);

/** ゲージ バッテリー最大値変更 プレイヤー側 */
export const playerMaxBatteryChange: StoryFn = hudGameObjectStory(
  ({ resources, gameObjectAction }) => {
    const gauge = playerGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 4,
    });
    maxBatteryChange(gauge).loop();
    return [gauge.getObject3D()];
  },
);

/** ゲージ 敵側 */
export const enemy: StoryFn = hudGameObjectStory(
  ({ resources, gameObjectAction }) => {
    const gauge = enemyGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 5,
    });
    gaugeChange(gauge).loop();
    return [gauge.getObject3D()];
  },
);

/** ゲージ バッテリー最大値変更 敵側 */
export const enemyMaxBatteryChange: StoryFn = hudGameObjectStory(
  ({ resources, gameObjectAction }) => {
    const gauge = enemyGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 4,
    });
    maxBatteryChange(gauge).loop();
    return [gauge.getObject3D()];
  },
);
