import { ResourcesContainer } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";
import { WingDozerView } from "../view/wing-dozer-view";
import { WingDozerProps } from "./wing-dozer-props";

/** WingDozerProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & {
  /** ビュー */
  view: WingDozerView;
  /** SE再生 */
  se: SEPlayer;
};

/**
 * WingDozerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
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
