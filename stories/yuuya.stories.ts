import { delay } from "../src/js/animation/delay";
import {
  enemyYuuyaCutIn,
  playerYuuyaCutIn,
  YuuyaCutInCreatorParams,
} from "../src/js/game-object/cut-in/yuuya";
import { YuuyaCutIn } from "../src/js/game-object/cut-in/yuuya/yuuya";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "yuuya-cutin",
};

/**
 * カットイン生成関数
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns カットイン
 */
type CutInGenerator = (params: YuuyaCutInCreatorParams) => YuuyaCutIn;

/**
 * カットイン ストーリー
 * @param generator カットイン生成関数
 * @param fn カットイン操作関数
 * @returns ルートHTML要素
 */
const cutInStory =
  (generator: CutInGenerator, fn: (cutIn: YuuyaCutIn) => void) =>
  (): HTMLElement => {
    const stub = new HUDGameObjectStub((params) => {
      const cutIn = generator(params);
      fn(cutIn);
      return [cutIn.getObject3D()];
    });
    stub.start();
    return stub.domElement();
  };

/**
 * カットインを表示する
 * @param cutIn カットイン
 */
const show = (cutIn: YuuyaCutIn) => {
  cutIn
    .show()
    .chain(delay(2000))
    .chain(cutIn.hidden())
    .chain(delay(2000))
    .loop();
};

/** プレイヤー側 ユウヤ カットイン */
export const player = cutInStory(playerYuuyaCutIn, show);

/** 敵側 ユウヤ カットイン */
export const enemy = cutInStory(enemyYuuyaCutIn, show);
