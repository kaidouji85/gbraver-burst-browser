import { Observable } from "rxjs";

import { ResourcesContainer } from "../../../resource";
import { GameObjectAction } from "../../action/game-object-action";
import { GranDozer } from "./gran-dozer";
import { EnemyGranDozerView } from "./view/enemy-gran-dozer-view";
import { PlayerGranDozerView } from "./view/player-gran-dozer-view";

/** オプション */
type Options = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー用グランドーザーを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function PlayerGranDozer(options: Options): GranDozer {
  const view = new PlayerGranDozerView(options.resources);
  return new GranDozer({ ...options, view });
}

/**
 * 敵用グランドーザーを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function EnemyGranDozer(options: Options): GranDozer {
  const view = new EnemyGranDozerView(options.resources);
  return new GranDozer({ ...options, view });
}
