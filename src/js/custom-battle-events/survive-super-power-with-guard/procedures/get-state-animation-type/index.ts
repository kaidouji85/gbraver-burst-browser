import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import {
  StateAnimationType,
  StateAnimationTypeCondition,
} from "../../state-animation-type";
import { isTsubasaFirstAttack } from "./is-tsubasa-first-attack";
import { isRaitoFinishBlow } from "./is-raito-finish-blow";

/**
 * 条件に応じたテートアニメーションタイプを取得する
 * @param options オプション
 * @returns ステートアニメーションタイプ
 */
export function getStateAnimationType(options: {
  /** カスタムステートアニメーションプロパティ */
  props: CustomStateAnimation;
  /** 条件オブジェクト */
  condition: StateAnimationTypeCondition;
}): StateAnimationType {
  let result: StateAnimationType = "None";
  if (isTsubasaFirstAttack(options)) {
    result = "TsubasaFirstAttack";
  } else if (isRaitoFinishBlow(options)) {
    result = "RaitoFinishBlow";
  }

  return result;
}
