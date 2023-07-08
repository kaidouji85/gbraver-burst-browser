import { Observable } from "rxjs";

import { Resources } from "../../../resource";
import { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraverCutIn } from "./genesis-braver-cutin";
import { EnemyGenesisBraverCutInView } from "./view/enemy-genesis-braver-cutin-view";
import { PlayerGenesisBraverCutInView } from "./view/player-genesis-braver-cutin-view";

/**
 * プレイヤー ジェネシスブレイバー カットイン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerGenesisBraverCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): GenesisBraverCutIn {
  const view = new PlayerGenesisBraverCutInView(resources);
  return new GenesisBraverCutIn(view, gameObjectAction);
}

/**
 * 敵 ジェネシスブレイバー カットイン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function enemyGenesisBraverCutIn(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): GenesisBraverCutIn {
  const view = new EnemyGenesisBraverCutInView(resources);
  return new GenesisBraverCutIn(view, gameObjectAction);
}
