// @flow
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {shinBraverBurstButton, wingDozerBurstButton} from "../src/js/game-object/burst-button";

export default {
  title: 'burst-button',
};

export const shinBraver = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const burstButton = shinBraverBurstButton(resources, listener);
    burstButton.pushButtonNotifier().subscribe(() => {
      burstButton.decide().play();
    });
    burstButton.open(true).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const wingDozer = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const burstButton = new wingDozerBurstButton(resources, listener);
    burstButton.pushButtonNotifier().subscribe(() => {
      burstButton.decide().play();
    });
    burstButton.open(true).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const disabled = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const burstButton = shinBraverBurstButton(resources, listener);
    burstButton.open(false).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}