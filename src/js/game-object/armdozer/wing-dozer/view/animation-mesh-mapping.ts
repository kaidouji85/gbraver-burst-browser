import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import type { AnimationType } from "../model/wing-dozer-model";

/** アニメーション、メッシュマッピング */
export type AnimationMeshMapping = {
  /** アニメーションタイプ */
  type: AnimationType;

  /** 対応するメッシュ */
  mesh: ArmdozerAnimation;
};