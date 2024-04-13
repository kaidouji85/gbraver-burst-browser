import { ContinuousAttackAnimationProps } from "../animation/animation-props";
import { ContinuousAttackView } from "../view/continuous-attack-view";

/** 連続攻撃プロパティ */
export type ContinuousAttackProps = ContinuousAttackAnimationProps & {
  /** ビュー */
  view: ContinuousAttackView;
};
