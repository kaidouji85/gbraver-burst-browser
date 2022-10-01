// @flow
import {delay} from "../src/js/animation/delay";
import {enemyGauge, playerGauge} from "../src/js/game-object/gauge";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";

export default {
  title: 'gauge',
};

export const player = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const gauge = playerGauge({resources, gameObjectAction, hp: 3100, battery: 5});
    const animation = delay(1000)
      .chain(gauge.hp(1000))
      .chain(gauge.battery(2))
      .chain(delay(1000))
      .chain(gauge.hp(300))
      .chain(gauge.battery(0))
      .chain(delay(1000))
      .chain(gauge.hp(3100))
      .chain(gauge.battery(5));
    animation.loop();
    return [gauge.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({resources, gameObjectAction}) => {
    const gauge = enemyGauge({resources, gameObjectAction, hp: 3100, battery: 5});
    const animation = delay(1000)
      .chain(gauge.hp(1000))
      .chain(gauge.battery(2))
      .chain(delay(1000))
      .chain(gauge.hp(300))
      .chain(gauge.battery(0))
      .chain(delay(1000))
      .chain(gauge.hp(3100))
      .chain(gauge.battery(5));
    animation.loop();
    return [gauge.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}