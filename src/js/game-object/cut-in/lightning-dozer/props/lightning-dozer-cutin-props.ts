import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";
import type {LightningDozerCutInView} from "../view/lightning-dozer-cutin-view";

/** ライトニングドーザ カットイン プロパティ */
export type LightningDozerCutInProps = {
  /** モデル */
  model: LightningDozerCutInModel;
  /** ビュー */
  view: LightningDozerCutInView;
}