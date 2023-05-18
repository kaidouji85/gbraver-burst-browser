import { delay } from "../src/js/animation/delay";
import { enemyShockWave, playerShockWave } from "../src/js/game-object/hitmark/shock-wave";
import { ShockWave } from "../src/js/game-object/hitmark/shock-wave/shock-wave";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "shock-wave"
};

const shockWaveAnimation = (shockWave: ShockWave) => {
  delay(1000)
    .chain(shockWave.popUp())
    .chain(delay(1000))
    .loop();
};

export const player = () => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const shockWave = playerShockWave(resources, gameObjectAction);
    shockWaveAnimation(shockWave);
    return {
      objects: [shockWave.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};

export const enemy = () => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const shockWave = enemyShockWave(resources, gameObjectAction);
    shockWaveAnimation(shockWave);
    return {
      objects: [shockWave.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};