import { LightningShotAnimationProps } from "../animation/animation-props";
import { LightningShotView } from "../view/lightning-shot-view";

/** 電撃ショットのプロパティ */
export type LightningShotProps = LightningShotAnimationProps & {
  /** ビュー */
  readonly view: LightningShotView;
};
