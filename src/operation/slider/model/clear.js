// @flow

import type {SliderOperationModel} from "./slider-operation-model";

/** 入力履歴をクリアする */
export function clear(origin: SliderOperationModel): SliderOperationModel {
  return {
    ...origin,
    lastValue: null
  };
}