import { delay } from "../src/js/animation/delay";
import {
  enemyBatteryEnchantment,
  playerBatteryEnchantment,
} from "../src/js/game-object/battery-enchantment";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
export default {
  title: "battery-enchantment",
};
export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const continuousAttack = playerBatteryEnchantment(
      resources,
      gameObjectAction
    );
    delay(1000).chain(continuousAttack.popUp()).loop();
    return {
      objects: [continuousAttack.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const continuousAttack = enemyBatteryEnchantment(
      resources,
      gameObjectAction
    );
    delay(1000).chain(continuousAttack.popUp()).loop();
    return {
      objects: [continuousAttack.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
