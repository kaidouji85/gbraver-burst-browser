// @flow

import type {FaderModel} from "./fader-model";
import type {PreRender} from "../../../action/game-loop/pre-render";

/**
 * プリレンダーの処理
 *
 * @param model 更新前
 * @return 更新結果
 */
export function preRender(model: FaderModel, action: PreRender): FaderModel {
  return {
    ...model,
    width: action.rendererDOM.clientWidth,
    height: action.rendererDOM.clientHeight,
  };
}