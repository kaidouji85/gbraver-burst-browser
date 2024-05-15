/** ルートHTML要素のclass属性 */
export const ROOT = "battle-simulator";

/** プレイヤーのバッテリー補正 class属性 */
export const PLAYER_BATTERY_CORRECT = `${ROOT}__player-battery-correct`;

/** プレイヤーのバッテリー補正が非表示のclass属性 */
export const PLAYER_BATTERY_CORRECT_HIDDEN = `${PLAYER_BATTERY_CORRECT}--hidden`;

/** 敵のバッテリー補正 class属性 */
export const ENEMY_BATTERY_CORRECT = `${ROOT}__enemy-battery-correct`;

/** 敵のバッテリー補正が非表示のclass属性 */
export const ENEMY_BATTERY_CORRECT_HIDDEN = `${ENEMY_BATTERY_CORRECT}--hidden`;

/** ターンインジケーターのclass属性 */
export const TURN_INDICATOR = `${ROOT}__turn-indicator`;

/** 敵ターン時のターンインジケーターのclass属性 */
export const TURN_INDICATOR_ENEMY = `${TURN_INDICATOR}--enemy-turn`;
