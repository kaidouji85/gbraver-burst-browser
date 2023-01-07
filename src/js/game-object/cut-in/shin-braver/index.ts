import type { Resources } from "../../../resource";
import type { Stream } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { ShinBraverCutIn } from "./shin-braver-cutin";
import { EnemyShinBraverCutInView } from "./view/enemy-shin-braver-cutin-view";
import { PlayerShinBraverCutInView } from "./view/player-shin-braver-cutin-view";

/**
 * プレイヤー側 シンブレイバー カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerShinBraverCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ShinBraverCutIn {
  const view = new PlayerShinBraverCutInView(resources);
  return new ShinBraverCutIn(view, gameObjectAction);
}

/**
 * 敵側 シンブレイバー カットイン
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyShinBraverCutIn(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ShinBraverCutIn {
  const view = new EnemyShinBraverCutInView(resources);
  return new ShinBraverCutIn(view, gameObjectAction);
}