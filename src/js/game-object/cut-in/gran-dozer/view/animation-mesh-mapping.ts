import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { AnimationType } from "../model/gran-dozer-cut-in-model";

/** アニメーション、メッシュマッピング */
export type AnimationMeshMapping = {
  /** アニメーションタイプ */
  type: AnimationType;

  /** 対応するメッシュ */
  mesh: HorizontalAnimationMesh;
};
