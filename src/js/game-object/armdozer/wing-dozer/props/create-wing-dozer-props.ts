import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";
import { WingDozerView } from "../view/wing-dozer-view";
import { WingDozerProps } from "./wing-dozer-props";

/** WingDozerProps生成パラメータ */
export type GenerateWingDozerPropsParams = {
  /** ビュー */
  view: WingDozerView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * WingDozerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createWingDozerProps(params: GenerateWingDozerPropsParams): WingDozerProps {
  const { view, resources } = params;
  return {
    view,
    model: createInitialValue(),
    sounds: new WingDozerSounds(resources)
  }
}