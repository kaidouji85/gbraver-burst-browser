import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import {
  StateAnimationType,
  StateAnimationTypeCondition,
} from "../../state-animation-type";
import { isRaitoFirstAttack } from "./is-raito-first-attack";
import { isTsubasaAttackTurnBurst } from "./is-tsubasa-attack-turn-burst";
import { isTsubasaDefenseTurnBurst } from "./is-tsubasa-defense-turn-burst";
import { isTsubasaFirstAttack } from "./is-tsubasa-first-attack";

/**
 * 条件に応じたテートアニメーションタイプを取得する
 * @param options オプション
 * @returns ステートアニメーションタイプ
 */
export function getStateAnimationType(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimationProps;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): StateAnimationType {
  let result: StateAnimationType = "None";
  if (isTsubasaFirstAttack(options)) {
    result = "TsubasaFirstAttack";
  } else if (isTsubasaAttackTurnBurst(options)) {
    result = "TsubasaAttackTurnBurst";
  } else if (isTsubasaDefenseTurnBurst(options)) {
    result = "TsubasaDefenseTurnBurst";
  } else if (isRaitoFirstAttack(options)) {
    result = "RaitoFirstAttack";
  }

  return result;
}
