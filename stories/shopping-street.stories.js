// @flow

import {TDGameObjectStub} from "./stub/td-game-object-stub";
import ShoppingStreet from "../src/js/game-object/stage/shopping-street";
import {Illumination} from "../src/js/game-object/illumination/illumination";
import {skyBox} from "../src/js/game/td-scenes/battle/view/td/sky-box";

export default {
  title: 'shopping-street',
};

export const game = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction, scene}) => {
    const illumination = new Illumination(gameObjectAction);
    const backGround = new ShoppingStreet(resources);
    scene.background = skyBox(resources);
    return [...backGround.getThreeJsObjects(), ...illumination.getObject3Ds()];
  });
  stub.start();
  return stub.domElement();
}

export const longShot = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction, scene, camera}) => {
    const illumination = new Illumination(gameObjectAction);
    const backGround = new ShoppingStreet(resources);
    scene.background = skyBox(resources);
    const distance = 2;
    camera.move({y: 220 * distance, z: 300 * distance}, 0).play();
    camera.lookAt({y: 200 * distance}, 0).play();
    return [...backGround.getThreeJsObjects(), ...illumination.getObject3Ds()];
  });
  stub.start();
  return stub.domElement();
}