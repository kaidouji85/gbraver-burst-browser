import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import type { AnimationType } from "../model/animation-type";

/** メッシュタイプ */
export type MeshType = "STANDARD" | "OUTLINE";

/** アニメーション、メッシュマッピング */
export type AnimationMeshMapping = {
  /** アニメーションタイプ */
  animationType: AnimationType;
  /** メッシュタイプ */
  meshType: MeshType;
  /** 対応するメッシュ */
  mesh: ArmdozerAnimation;
};
