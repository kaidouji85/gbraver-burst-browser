import type { Resources } from "../../../resource";
import type { Stream } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraver } from "./genesis-braver";
import { EnemyGenesisBraverView } from "./view/enemy-genesis-braver-view";
import { PlayerGenesisBraverView } from "./view/player-genesis-braver-view";

/**
 * プレイヤージェネシスブレイバーを生成
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function PlayerGenesisBraver(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): GenesisBraver {
  const view = new PlayerGenesisBraverView(resources);
  return new GenesisBraver(view, resources, gameObjectAction);
}

/**
 * 敵ジェネシスブレイバーを生成
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function EnemyGenesisBraver(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): GenesisBraver {
  const view = new EnemyGenesisBraverView(resources);
  return new GenesisBraver(view, resources, gameObjectAction);
}
