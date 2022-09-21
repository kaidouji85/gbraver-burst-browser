// @flow
import {circleOverlap} from "../src/js/game-object/overlap-object/circle-overlap";
import {HUDGameObjectStub} from "./stub/hud-game-object-stub";

export default {
  title: 'overlap-object',
};

export const circle = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({gameObjectAction}) => {
    const overlap = circleOverlap({radius: 32, segments: 32, gameObjectAction, visible: true});
    overlap.pushStartNotifier().subscribe(event => {
      console.log('push start', event);
    });
    return [overlap.getObject3D()];
  });
  stub.start();
  return stub.domElement();
}
