import { delay } from "../src/js/animation/delay";
import { enemyReflectIndicator, playerReflectIndicator } from "../src/js/game-object/reflect-indicator";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
export default {
  title: "reflect"
};
export const player = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const continuousAttack = playerReflectIndicator(resources, gameObjectAction);
    delay(1000).chain(continuousAttack.popUp()).loop();
    return {
      objects: [continuousAttack.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const continuousAttack = enemyReflectIndicator(resources, gameObjectAction);
    delay(1000).chain(continuousAttack.popUp()).loop();
    return {
      objects: [continuousAttack.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};