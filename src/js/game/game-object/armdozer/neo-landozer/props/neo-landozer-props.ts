import { NeoLandozerAnimationProps } from "../animation/animation-props";
import { NeoLandozerView } from "../view/neo-landozer-view";

/** ネオランドーザ プロパティ */
export type NeoLandozerProps = NeoLandozerAnimationProps & {
  /** ビュー */
  view: NeoLandozerView;
};
