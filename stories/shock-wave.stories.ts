import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  enemyShockWave,
  playerShockWave,
} from "../src/js/game-object/hitmark/shock-wave";
import { ShockWave } from "../src/js/game-object/hitmark/shock-wave/shock-wave";
import { Resources } from "../src/js/resource";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "shock-wave",
};

/**
 * 衝撃波ストーリー
 * @param generator 衝撃波生成オブジェクト
 * @param fn 衝撃波を操作する関数
 * @return story
 */
const shockWaveStory =
  (
    generator: (
      resources: Resources,
      gameObjectAction: Observable<GameObjectAction>
    ) => ShockWave,
    fn: (shockWave: ShockWave) => void
  ) =>
  () => {
    const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
      const shockWave = generator(resources, gameObjectAction);
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
 * @param shockWave 衝撃波
 */
const popUp = (shockWave: ShockWave) => {
  delay(1000).chain(shockWave.popUp()).chain(delay(1000)).loop();
};

/** プレイヤー衝撃波 ポップアップ */
export const player = shockWaveStory(playerShockWave, popUp);

/** 敵衝撃波 ポップアップ */
export const enemy = shockWaveStory(enemyShockWave, popUp);
