import { GranDozerModel } from "../model/gran-dozer-model";
import { GranDozerView } from "../view/gran-dozer-view";

/** グランドーザのプロパティ */
export type GranDozerProps = {
  /** モデル */
  model: GranDozerModel;
  /** ビュー */
  view: GranDozerView;
};
