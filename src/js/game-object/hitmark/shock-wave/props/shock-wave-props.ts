import { SEPlayerContainer } from "../../../../se/se-player";
import { AnimationProps } from "../animation/animation-props";
import { ShockWaveView } from "../view/shock-wave-view";

/** 衝撃波 プロパティ */
export type ShockWaveProps = SEPlayerContainer &
  AnimationProps & {
    /** ビュー */
    view: ShockWaveView;
  };
