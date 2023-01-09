import { delay } from "../src/js/animation/delay";
import {
  enemyDamageIndicator,
  playerDamageIndicator,
} from "../src/js/game-object/damage-indicator";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
export default {
  title: "damage-indicator",
};
export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const continuousAttack = playerDamageIndicator(resources, gameObjectAction);
    delay(1000).chain(continuousAttack.popUp(1000)).loop();
    return {
      objects: [continuousAttack.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const continuousAttack = enemyDamageIndicator(resources, gameObjectAction);
    delay(1000).chain(continuousAttack.popUp(1000)).loop();
    return {
      objects: [continuousAttack.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
