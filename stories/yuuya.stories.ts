import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  enemyYuuyaCutIn,
  playerYuuyaCutIn,
} from "../src/js/game-object/cut-in/yuuya";
import { YuuyaCutIn } from "../src/js/game-object/cut-in/yuuya/yuuya";
import { Resources } from "../src/js/resource";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "yuuya-cutin",
};

/**
 * カットイン生成関数
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return カットイン
 */
type CutInGenerator = (
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
) => YuuyaCutIn;

/**
 * カットイン ストーリー
 * @param generator カットイン生成関数
 * @param fn カットイン操作関数
 * @return ルートHTML要素
 */
const cutInStory = (
  generator: CutInGenerator,
  fn: (cutIn: YuuyaCutIn) => void,
) => (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const cutIn = generator(resources, gameObjectAction);
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
