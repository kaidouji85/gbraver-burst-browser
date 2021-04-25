// @flow

import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {delay} from "../src/js/animation/delay";
import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton
} from "../src/js/game-object/pilot-button";

export default {
  title: 'pilot-button',
};

export const shinya = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = shinyaPilotButton(resources, listener);
    button.pushButtonNotifier().subscribe(() => {
      console.log('push button!!');
      const animation = button.decide()
        .chain(delay(1000))
        .chain(button.close())
        .chain(delay(1000))
        .chain(button.open(false));
      animation.play();
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const gai = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = gaiPilotButton(resources, listener);
    button.pushButtonNotifier().subscribe(() => {
      console.log('push button!!');
      const animation = button.decide()
        .chain(delay(1000))
        .chain(button.close())
        .chain(delay(1000))
        .chain(button.open(false));
      animation.play();
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const raito = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = raitoPilotButton(resources, listener);
    button.pushButtonNotifier().subscribe(() => {
      console.log('push button!!');
      const animation = button.decide()
        .chain(delay(1000))
        .chain(button.close())
        .chain(delay(1000))
        .chain(button.open(false));
      animation.play();
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}

export const tsubasa = (): HTMLElement => {
  const stub = new HUDGameObjectStub((resources, listener) => {
    const button = tsubasaPilotButton(resources, listener);
    button.pushButtonNotifier().subscribe(() => {
      console.log('push button!!');
      const animation = button.decide()
        .chain(delay(1000))
        .chain(button.close())
        .chain(delay(1000))
        .chain(button.open(false));
      animation.play();
    });
    button.open(true).play();
    return [button.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}