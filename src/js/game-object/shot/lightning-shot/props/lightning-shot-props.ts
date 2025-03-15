import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { LightningShotModel } from "../model/lightning-shot-model";

/** 電撃ショットのプロパティ */
export type LightningShotProps = {
  /** メッシュ */
  readonly mesh: HorizontalAnimationMesh;
  /** モデル */
  model: LightningShotModel;
};
