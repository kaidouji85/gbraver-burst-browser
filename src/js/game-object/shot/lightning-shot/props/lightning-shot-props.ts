import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { LightningShotModel } from "../model/lightning-shot-model";
import { LightningShotView } from "../view/lightning-shot-view";

/** 電撃ショットのプロパティ */
export type LightningShotProps = {
  /** モデル */
  model: LightningShotModel;
  /** ビュー */
  readonly view: LightningShotView;
};
