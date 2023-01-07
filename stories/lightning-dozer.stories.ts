import { delay } from "../src/js/animation/delay";
import { PlayerLightningDozer } from "../src/js/game-object/armdozer/lightning-dozer";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
export default {
  title: "lightning-dozer"
};
export const activeStand = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const armHammer = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    const animation = sprite.charge().chain(delay(1000)).chain(sprite.armHammer()).chain(delay(2000)).chain(sprite.hmToStand()).chain(delay(2000));
    animation.loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeAvoid = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000).chain(sprite.avoid()).chain(delay(1000)).chain(sprite.avoidToStand()).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeGuard = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000).chain(sprite.guard()).chain(delay(1000)).chain(sprite.guardToStand()).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeKnockBack = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000).chain(sprite.knockBack()).chain(delay(1000)).chain(sprite.knockBackToStand()).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const activeGuts = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    sprite.startActive().play();
    delay(1000).chain(sprite.guts()).chain(delay(1000)).chain(sprite.gutsToStand()).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};
export const down = (): HTMLElement => {
  const stub = new TDGameObjectStub(({
    resources,
    gameObjectAction
  }) => {
    const sprite = PlayerLightningDozer(resources, gameObjectAction);
    delay(1000).chain(sprite.down()).chain(delay(1000)).loop();
    return {
      objects: [sprite.getObject3D()]
    };
  });
  stub.start();
  return stub.domElement();
};