import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { createGranDozerSounds } from "../sounds/gran-dozer-sounds";
import { GranDozerView } from "../view/gran-dozer-view";
import { GranDozerProps } from "./gran-dozer-props";

/** グランドーザプロパティ生成オプション */
export type GranDozerPropsCreatorOptions = SEPlayerContainer &
  ResourcesContainer & {
    /** ビュー */
    view: GranDozerView;
  };

/**
 * グランドーザのプロパティを生成する
 * @param options オプション
 * @returns 生成したプロパティ
 */
export function createGranDozerProps(
  options: GranDozerPropsCreatorOptions,
): GranDozerProps {
  return {
    ...options,
    model: createInitialValue(),
    sounds: createGranDozerSounds(options),
  };
}
