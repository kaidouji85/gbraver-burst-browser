import { ShockWaveAnimationProps } from "../animation/animation-props";
import { ShockWaveView } from "../view/shock-wave-view";

/** 衝撃波 プロパティ */
export type ShockWaveProps = ShockWaveAnimationProps & {
  /** ビュー */
  view: ShockWaveView;
};
