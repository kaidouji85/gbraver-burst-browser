import { NeoLandozerCutInView } from "../view/neo-landozer-cutin-view";
import { NeoLandozerCutInAnimationProps } from "../animation/animation-props";

/** ネオランドーザ カットイン プロパティ */
export type NeoLandozerCutInProps = NeoLandozerCutInAnimationProps & {
  /** ビュー */
  view: NeoLandozerCutInView;
};
