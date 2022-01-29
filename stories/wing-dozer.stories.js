// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {EnemyWingDozer, PlayerWingDozer} from "../src/js/game-object/armdozer/wing-dozer";
import {delay} from "../src/js/animation/delay";

export default {
  title: 'wing-dozer',
};

export const stand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const enemy = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = EnemyWingDozer(resources, gameObjectAction);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const attack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
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

export const dash = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    const animation = sprite.dash()
      .chain(delay(2000))
      .chain(sprite.dashToStand())
      .chain(delay(2000));
    animation.loop();
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const down = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction}) => {
    const sprite = PlayerWingDozer(resources, gameObjectAction);
    const animation = sprite.down()
      .chain(delay(2000));
    animation.loop();
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}