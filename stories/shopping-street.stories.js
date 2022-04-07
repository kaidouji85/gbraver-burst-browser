// @flow
import {TDGameObjectStub} from "./stub/td-game-object-stub";
import ShoppingStreet from "../src/js/game-object/stage/shopping-street";
import {Illumination} from "../src/js/game-object/illumination/illumination";
import {skyBox} from "../src/js/game/td-scenes/battle/view/td/sky-box";
import {stillImageStub} from "./stub/still-image-stub";

export default {
  title: 'shopping-street',
};

export const game = (): HTMLElement => {
  const stub = new TDGameObjectStub(({resources, gameObjectAction, scene}) => {
    const illumination = new Illumination(gameObjectAction);
    const shoppingStreet = new ShoppingStreet(resources);
    scene.background = skyBox(resources);
    return [...shoppingStreet.getThreeJsObjects(), ...illumination.getObject3Ds()];
  });
  stub.start();
  return stub.domElement();
}

export const highResolutionStillImage = (): HTMLElement => {
  const renderer = {width: 7680, height: 4320, pixelRatio: 1};
  const distanceScale = 2;
  const position = {x: 0, y: 220 * distanceScale, z: 300 * distanceScale};
  const target = {x: 0, y: 200 * distanceScale, z: 0};
  const camera = {position, target};
  const creator = ({resources, emptyGameObjectAction}) => {
    const illumination = new Illumination(emptyGameObjectAction);
    const shoppingStreet = new ShoppingStreet(resources);
    const objects = [...illumination.getObject3Ds(), ...shoppingStreet.getThreeJsObjects()];
    const backGround = skyBox(resources);
    return {objects, backGround};
  };
  return stillImageStub({camera, renderer, creator});
};