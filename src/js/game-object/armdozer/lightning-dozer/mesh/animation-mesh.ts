import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import type { AnimationType } from "../model/lightning-dozer-model";

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
