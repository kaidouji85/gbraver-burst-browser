import { ResourcesContainer } from "../../resource";
import { SEPlayerContainer } from "../../se/se-player";
import { GameObjectActionContainer } from "../action/game-object-action-container";
import { EffectClear } from "./effectClear";
import { EnemyEffectClearView } from "./view/enemy-effect-clear-view";
import { PlayerEffectClearView } from "./view/player-effect-clear-view";

/** 生成オプション */
export type EffectClearCreatorOptions = ResourcesContainer &
  SEPlayerContainer &
  GameObjectActionContainer;

/**
 * プレイヤー 効果消去 ポップアップ
 * @param options 生成パラメータ
 * @returns 生成結果
 */
export function playerEffectClear(
  options: EffectClearCreatorOptions,
): EffectClear {
  const { resources } = options;
  const view = new PlayerEffectClearView(resources);
  return new EffectClear({ ...options, view });
}

/**
 * 敵 効果消去 ポップアップ
 * @param options 生成パラメータ
 * @returns 生成結果
 */
export function enemyEffectClear(
  options: EffectClearCreatorOptions,
): EffectClear {
  const { resources } = options;
  const view = new EnemyEffectClearView(resources);
  return new EffectClear({ ...options, view });
}
