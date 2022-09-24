// @flow
import {circlePushDetector} from "../src/js/game-object/push-detector/push-detector";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";

export default {
  title: 'push-detector',
};

export const circle = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({gameObjectAction}) => {
    const overlap = circlePushDetector({radius: 32, segments: 32, gameObjectAction, visible: true});
    overlap.pushStartNotifier().subscribe(event => {
      console.log('push start', event);
    });
    return [overlap.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
