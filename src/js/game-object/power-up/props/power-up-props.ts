import { PowerUpAnimationProps } from "../animation/animation-props";
import { PowerUpView } from "../view/power-up-view";

/** 攻撃アップ プロパティ */
export type PowerUpProps = PowerUpAnimationProps & {
  /** ビュー */
  view: PowerUpView;
};
