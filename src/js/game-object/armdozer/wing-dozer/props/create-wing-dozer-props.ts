import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";
import { WingDozerView } from "../view/wing-dozer-view";
import { WingDozerProps } from "./wing-dozer-props";

/** WingDozerProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: WingDozerView;
  };

/**
 * WingDozerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createWingDozerProps(
  params: PropsCreatorParams,
): WingDozerProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new WingDozerSounds(resources),
  };
}
