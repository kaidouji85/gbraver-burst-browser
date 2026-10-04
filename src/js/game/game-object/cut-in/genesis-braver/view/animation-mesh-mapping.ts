import { HorizontalAnimationMesh } from "../../../../../web-gl/mesh/horizontal-animation";
import { AnimationType } from "../model/genesis-braver-cutin-model";

/** アニメーション、メッシュマッピング */
export type AnimationMeshMapping = {
  /** アニメーションタイプ */
  type: AnimationType;

  /** 対応するメッシュ */
  mesh: HorizontalAnimationMesh;
};
