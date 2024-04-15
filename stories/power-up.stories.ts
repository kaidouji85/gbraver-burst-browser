import { delay } from "../src/js/animation/delay";
import {
  enemyPowerUp,
  playerPowerUp,
  PowerUpCreatorParams,
} from "../src/js/game-object/power-up";
import { PowerUp } from "../src/js/game-object/power-up/power-up";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "power-up",
};

/**
 * 攻撃アップのストーリー
 * @param generator 攻撃アップ生成関数
 * @param fn 攻撃アップ操作関数
 * @return story
 */
const powerUpStory =
  (
    generator: (params: PowerUpCreatorParams) => PowerUp,
    fn: (powerUp: PowerUp) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub((params) => {
      const powerUp = generator(params);
      fn(powerUp);
      return {
        objects: [powerUp.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * ポップアップ
 * @param powerUp 攻撃アップ
 */
const popUp = (powerUp: PowerUp) => {
  delay(1000).chain(powerUp.popUp()).loop();
};

/** プレイヤー 攻撃アップ ポップアップ */
export const playerPopUp = powerUpStory(playerPowerUp, popUp);

/** 敵 攻撃アップ ポップアップ */
export const enemyPopUp = powerUpStory(enemyPowerUp, popUp);
