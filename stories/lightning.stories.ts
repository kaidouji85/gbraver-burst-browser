import { delay } from "../src/js/animation/delay";
import {
  enemyLightning,
  LightningCreatorParams,
  playerLightning,
} from "../src/js/game-object/hitmark/lightning";
import { Lightning } from "../src/js/game-object/hitmark/lightning/lightning";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "lightning",
};

/**
 * 電撃アタックストーリー
 * @param generator 電撃アタック生成関数
 * @param fn 電撃アタックを操作する関数
 * @return story
 */
const lightingStory =
  (
    generator: (params: LightningCreatorParams) => Lightning,
    fn: (lightning: Lightning) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub((params) => {
      const shockWave = generator(params);
      fn(shockWave);
      return {
        objects: [shockWave.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポップアップ
 * @param lightning 電撃アタック
 */
const popUp = (lightning: Lightning) => {
  delay(1000).chain(lightning.popUp()).chain(delay(1000)).loop();
};

/** プレイヤー 電撃アタック ポップアップ */
export const playerPopUp = lightingStory(playerLightning, popUp);

/** 敵 電撃アタック ポップアップ */
export const enemyPopUp = lightingStory(enemyLightning, popUp);
