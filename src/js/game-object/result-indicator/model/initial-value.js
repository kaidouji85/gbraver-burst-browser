// @flow
import type {ResultIndicatorModel} from "./result-indicator-model";
import {HUD_RESULT_INDICATOR} from "../../../zindex/hud-zindex";

/**
 * モデルの初期値を生成する
 *
 * @return 生成結果
 */
export function createInitialValue(): ResultIndicatorModel {
  return {
    scale: 1,
    opacity: 0,
    zIndex: HUD_RESULT_INDICATOR,
    worldCoordinate: {x: 0, y: 0},
    localCoordinate: {x: 0, y: 0},
  };
}