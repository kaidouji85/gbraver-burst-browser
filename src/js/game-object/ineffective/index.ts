import { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { Ineffective } from "./ineffective";
import { EnemyIneffectiveView } from "./view/enemy-ineffective-view";
import { PlayerIneffectiveView } from "./view/player-ineffective-view";

/** 生成オプション */
export type IneffectiveCreatorOptions = ResourcesContainer &
  SEPlayerContainer &
  GameObjectActionContainer;

/**
 * プレイヤー 効果無効 ポップアップ
 * @param options 生成パラメータ
 * @returns 生成結果
 */
export function playerIneffective(
  options: IneffectiveCreatorOptions,
): Ineffective {
  const { resources } = options;
  const view = new PlayerIneffectiveView(resources);
  return new Ineffective({ ...options, view });
}

/**
 * 敵 効果無効 ポップアップ
 * @param options 生成パラメータ
 * @returns 生成結果
 */
export function enemyIneffective(
  options: IneffectiveCreatorOptions,
): Ineffective {
  const { resources } = options;
  const view = new EnemyIneffectiveView(resources);
  return new Ineffective({ ...options, view });
}
