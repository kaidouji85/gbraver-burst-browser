import { delay } from "../src/js/animation/delay";
import { Illumination } from "../src/js/game-object/illumination/illumination";
import ShoppingStreet from "../src/js/game-object/stage/shopping-street/shopping-street";
import { createSkyBox } from "../src/js/td-scenes/battle/view/td/sky-box";
import { Object3DsGeneratorParams } from "./stub/still-image-stub";
import { stillImageStub } from "./stub/still-image-stub";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "shopping-street",
};

/** ゲーム画面での表示 */
export const game = tdGameObjectStory(({ resources, gameObjectAction }) => {
  const illumination = new Illumination(gameObjectAction);
  const shoppingStreet = new ShoppingStreet(resources);
  const objects = [
    ...shoppingStreet.getThreeJsObjects(),
    ...illumination.getObject3Ds(),
  ];
  const skyBox = createSkyBox(resources);
  return {
    objects,
    skyBox,
  };
});

/** 照明テスト */
export const illumination = tdGameObjectStory(
  ({ resources, gameObjectAction }) => {
    const illumination = new Illumination(gameObjectAction);
    const shoppingStreet = new ShoppingStreet(resources);
    const objects = [
      ...shoppingStreet.getThreeJsObjects(),
      ...illumination.getObject3Ds(),
    ];
    const skyBox = createSkyBox(resources);

    delay(1000)
      .chain(illumination.intensity(0.2, 1000))
      .chain(delay(1000))
      .chain(illumination.intensity(1, 1000))
      .chain(delay(1000))
      .chain(illumination.color({ r: 1, g: 0, b: 0 }, 1000))
      .chain(delay(1000))
      .chain(illumination.color({ r: 1, g: 1, b: 1 }, 1000))
      .chain(delay(1000))
      .loop();
    illumination.intensity(0.5, 0);

    return {
      objects,
      skyBox,
    };
  },
);

/** 静止画 ハイレゾリューション */
export const highResolutionStillImage = (() => {
  const renderer = {
    width: 7680,
    height: 4320,
    pixelRatio: 1,
  };
  const distanceScale = 2;
  const position = {
    x: 0,
    y: 220 * distanceScale,
    z: 300 * distanceScale,
  };
  const target = {
    x: 0,
    y: 200 * distanceScale,
    z: 0,
  };
  const camera = {
    position,
    target,
  };

  const creator = ({
    resources,
    emptyGameObjectAction,
  }: Object3DsGeneratorParams) => {
    const illumination = new Illumination(emptyGameObjectAction);
    const shoppingStreet = new ShoppingStreet(resources);
    const objects = [
      ...illumination.getObject3Ds(),
      ...shoppingStreet.getThreeJsObjects(),
    ];
    const skyBox = createSkyBox(resources);
    return {
      objects,
      skyBox,
    };
  };

  return stillImageStub({ camera, renderer, creator });
})();
