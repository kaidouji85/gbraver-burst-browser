import { createInitialValue } from "../model/initial-value";
import { GranDozerView } from "../view/gran-dozer-view";
import { GranDozerProps } from "./gran-dozer-props";

/**
 * グランドーザのプロパティを生成する
 * @param view ビュー
 * @returns 生成したプロパティ
 */
export function createGranDozerProps(view: GranDozerView): GranDozerProps {
  return {
    view,
    model: createInitialValue(),
  };
}
