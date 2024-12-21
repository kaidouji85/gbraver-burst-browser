import { ResourcesContainer } from "../../../resource";
import { GranDozer } from "./gran-dozer";
import { PlayerGranDozerView } from "./view/player-gran-dozer-view";

/** オプション */
type Options = ResourcesContainer;

/**
 * プレイヤー用グランドーザーを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function playerGranDozer(options: Options): GranDozer {
  const view = new PlayerGranDozerView(options.resources);
  return new GranDozer(view);
}

/**
 * 敵用グランドーザーを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function enemyGranDozer(options: Options): GranDozer {
  const view = new PlayerGranDozerView(options.resources);
  return new GranDozer(view);
}
