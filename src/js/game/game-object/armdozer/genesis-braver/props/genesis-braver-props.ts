import { GenesisBraverAnimationProps } from "../animation/animation-props";
import { GenesisBraverView } from "../view/genesis-braver-view";

/** ジェネシスブレイバーのプロパティ */
export type GenesisBraverProps = GenesisBraverAnimationProps & {
  /** ビュー */
  view: GenesisBraverView;
};
