// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import ShoppingStreet from "../src/js/game-object/stage/shopping-street";
import {Illumination} from "../src/js/game-object/illumination/illumination";
import {skyBox} from "../src/js/game/td-scenes/battle/view/td/sky-box";

export default {
  title: 'shopping-street',
};

export const shoppingStreet = (): HTMLElement => {
  const stub = new TDGameObjectStub((resources, gameObjectAction, scene, camera) => {
    const illumination = new Illumination(gameObjectAction);
    const backGround = new ShoppingStreet(resources);
    scene.background = skyBox(resources);
    const cameraScale = 2;
    camera.moveCamera({y: 220 * cameraScale, z: 300 * cameraScale}, 0).play();
    camera.moveViewPoint({y: 200 * cameraScale}, 0).play();
    return [...backGround.getThreeJsObjects(), ...illumination.getObject3Ds()];
  });
  stub.start();
  return stub.domElement();
}
