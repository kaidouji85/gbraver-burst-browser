import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import {
  StateAnimationType,
  StateAnimationTypeCondition,
} from "../../state-animation-type";
import { isRaitoFirstAttack } from "./is-raito-first-attack";
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
  } else if (isRaitoFirstAttack(options)) {
    result = "RaitoFirstAttack";
  }

  return result;
}
