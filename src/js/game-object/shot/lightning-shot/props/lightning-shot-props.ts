import { LightningShotModel } from "../model/lightning-shot-model";
import { LightningShotSounds } from "../sounds/lightning-shot-sounds";
import { LightningShotView } from "../view/lightning-shot-view";

/** 電撃ショットのプロパティ */
export type LightningShotProps = {
  /** モデル */
  model: LightningShotModel;
  /** サウンド */
  readonly sounds: LightningShotSounds;
  /** ビュー */
  readonly view: LightningShotView;
};
