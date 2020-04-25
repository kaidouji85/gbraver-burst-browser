// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import {PlayerShinBraver} from "../src/js/game-object/armdozer/shin-braver";
import {PlayerNeoLandozer} from "../src/js/game-object/armdozer/neo-landozer";
import {PlayerLightningDozer} from "../src/js/game-object/armdozer/lightning-dozer";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {BatterySelector} from "../src/js/game-object/battery-selector";

export default {
  title: 'three-js-objects',
};

export const ShinBraver = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerShinBraver(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const NeoLandozer = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerNeoLandozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const LightningDozer = () => {
  const stub = new TDGameObjectStub((resources, listener) => {
    const sprite = PlayerLightningDozer(resources, listener);
    return [sprite.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const BatterySelectorStub = () => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const selector = new BatterySelector({
      resources: resources,
      listener: listener,
      maxBattery: 5,
      onBatteryChange: (battery: number) => {
        // NOP
      },
      onOkButtonPush: () => {
        // NOP
      },
    });
    selector.open(1, 5,'Attack').play();
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}