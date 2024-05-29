/** ルートHTML要素のclass属性 */
export const ROOT = "battle-simulator";

/** ターンインジケーターのclass属性 */
export const TURN_INDICATOR = `${ROOT}__turn-indicator`;

/** 敵ターン時のターンインジケーターのclass属性 */
export const TURN_INDICATOR_ENEMY = `${TURN_INDICATOR}--enemy-turn`;

/** ダメージ数字のclass属性 */
export const DAMAGE = `${ROOT}__damage`;

/** ダメージ数字（シミュレーション結果で死亡する場合）のclass属性 */
export const DAMAGE_IS_DEATH = `${DAMAGE}--is-death`;

/** 戦闘結果名のclass属性 */
export const BATTLE_RESULT_NAME = `${ROOT}__battle-result-name`;

/** 戦闘結果名（シミュレーション結果で死亡する場合）のclass属性 */
export const BATTLE_RESULT_NAME_IS_DEATH = `${BATTLE_RESULT_NAME}--is-death`;
