import { GranDozer } from "./gran-dozer";

/**
 * プレイヤー用グランドーザーを生成する
 * @returns 生成結果
 */
export function playerGranDozer(): GranDozer {
  return new GranDozer();
}

/**
 * 敵用グランドーザーを生成する
 * @returns 生成結果
 */
export function enemyGranDozer(): GranDozer {
  return new GranDozer();
}
