import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import type { AnimationType } from "../model/animation-type";

/** アニメーション、メッシュマッピング */
export type AnimationMeshMapping = {
  /** アニメーションタイプ */
  type: AnimationType;

  /** 対応するメッシュ */
  mesh: ArmdozerAnimation;
};
