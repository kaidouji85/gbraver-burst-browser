import { Observable } from "rxjs";
import { delay } from "../src/js/animation/delay";
import { enemyPowerUp, playerPowerUp } from "../src/js/game-object/power-up";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import { PowerUp } from "../src/js/game-object/power-up/power-up";

export default {
  title: "power-up",
};

/**
 * 攻撃アップのストーリー
 * @param generator 攻撃アップ生成関数
 * @param fn 攻撃アップ操作関数
 * @return story
 */
const powerUpStory = (
  generator: (resources: Resources, gameObjectAction: Observable<GameObjectAction>) => PowerUp,
  fn: (powerUp: PowerUp) => void
) => () => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const powerUp = generator(resources, gameObjectAction);
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
