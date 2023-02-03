import { BatterySelector } from "../src/js/game-object/battery-selector";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";
export default {
  title: "battery-selector",
};
export const batterySelector = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const selector: BatterySelector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
      maxBattery: 5,
    });
    selector.open(1, 5, 5, "Attack").play();
    selector.notifyDecision().subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      selector.decide().play();
    });
    selector.notifyBatteryPlus().subscribe(() => {
      selector.batteryPlus().play();
    });
    selector.notifyBatteryMinus().subscribe(() => {
      selector.batteryMinus().play();
    });
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const batterySelector4 = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const selector: BatterySelector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
      maxBattery: 5,
    });
    selector.open(1, 4, 4, "Attack").play();
    selector.notifyDecision().subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      selector.decide().play();
    });
    selector.notifyBatteryPlus().subscribe(() => {
      selector.batteryPlus().play();
    });
    selector.notifyBatteryMinus().subscribe(() => {
      selector.batteryMinus().play();
    });
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const batterySelector8 = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const selector: BatterySelector = new BatterySelector({
      resources: resources,
      gameObjectAction: gameObjectAction,
      maxBattery: 5,
    });
    selector.open(1, 8, 8, "Attack").play();
    selector.notifyDecision().subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      selector.decide().play();
    });
    selector.notifyBatteryPlus().subscribe(() => {
      selector.batteryPlus().play();
    });
    selector.notifyBatteryMinus().subscribe(() => {
      selector.batteryMinus().play();
    });
    return [selector.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
