import { NeoLandozerCutInAnimationProps } from "../animation/animation-props";
import { NeoLandozerCutInView } from "../view/neo-landozer-cutin-view";

/** ネオランドーザ カットイン プロパティ */
export type NeoLandozerCutInProps = NeoLandozerCutInAnimationProps & {
  /** ビュー */
  view: NeoLandozerCutInView;
};
