import { all } from "../src/js/animation/all";
import { Animate } from "../src/js/animation/animate";
import { delay } from "../src/js/animation/delay";
import { enemyGauge, playerGauge } from "../src/js/game-object/gauge";
import { Gauge } from "../src/js/game-object/gauge/gauge";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "gauge",
};

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

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const gauge = playerGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 5,
    });
    gaugeChange(gauge).loop();
    return [gauge.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const playerMaxBatteryChange = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const gauge = playerGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 4,
    });
    maxBatteryChange(gauge).loop();
    return [gauge.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const gauge = enemyGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 5,
    });
    gaugeChange(gauge).loop();
    return [gauge.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const enemyMaxBatteryChange = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const gauge = enemyGauge({
      resources,
      gameObjectAction,
      hp: 3100,
      battery: 4,
    });
    maxBatteryChange(gauge).loop();
    return [gauge.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
