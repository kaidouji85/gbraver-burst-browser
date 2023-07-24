import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import type { AnimationType } from "../model/animation-type";

/** メッシュタイプ */
export type MeshType = "STANDARD" | "OUTLINE";

/** アニメーションメッシュ */
export type AnimationMesh = {
  /** アニメーションタイプ */
  animationType: AnimationType;
  /** メッシュタイプ */
  meshType: MeshType;
  /** 対応するメッシュ */
  mesh: ArmdozerAnimation;
};
