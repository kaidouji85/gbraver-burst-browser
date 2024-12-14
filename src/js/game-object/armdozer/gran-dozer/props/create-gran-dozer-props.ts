import { createInitialValue } from "../model/initial-value";
import { GranDozerProps } from "./gran-dozer-props";

/**
 * グランドーザのプロパティを生成する
 * @returns 生成したプロパティ
 */
export function createGranDozerProps(): GranDozerProps {
  return {
    model: createInitialValue(),
  };
}
