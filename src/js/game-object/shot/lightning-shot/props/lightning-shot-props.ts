import { LightningShotView } from "../view/lightning-shot-view";
import { LightningShotAnimationProps } from "../animation/animation-props";

/** 電撃ショットのプロパティ */
export type LightningShotProps = LightningShotAnimationProps & {
  /** ビュー */
  readonly view: LightningShotView;
};
