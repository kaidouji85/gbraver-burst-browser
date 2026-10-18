import { GenesisBraverCutInAnimationProps } from "../animation/animation-props";
import { GenesisBraverCutInView } from "../view/genesis-braver-cutin-view";

/** ジェネシスブレイバー カットイン プロパティ */
export type GenesisBraverCutInProps = GenesisBraverCutInAnimationProps & {
  /** ビュー */
  view: GenesisBraverCutInView;
};
