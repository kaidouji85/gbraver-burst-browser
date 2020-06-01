// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {EnemyWingDozer, PlayerWingDozer} from "../src/js/game-object/armdozer/wing-dozer";
import {delay} from "../src/js/animation/delay";

export default {
  title: 'wing-dozer',
};

export const stand = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerWingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = EnemyWingDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const attack = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerWingDozer(resources, listener);
    const animation = sprite.charge()
      .chain(delay(500))
      .chain(sprite.upper())
      .chain(delay(500))
      .chain(sprite.upperToStand())
      .chain(delay(1000));
    animation.loop();
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}