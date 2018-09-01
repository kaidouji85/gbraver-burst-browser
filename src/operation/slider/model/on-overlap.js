// @flow

import type {SliderOperationModel} from "./slider-operation-model";

/** スライダーの値が変更された場合の戻り値 */
type ChangeValue = {
  update: SliderOperationModel,
  isValueChanged: true,
  value: number
};

/** スライダーの値に変更がない場合の戻り値 */
type NotChangeValue = {
  update: SliderOperationModel,
  isValueChanged: false,
};

/**
 * スライダーの当たり判定から、値が変更されたか否かをチェックする
 * また、モデルに入力値をセットする
 *
 * @param origin 更新前のモデル
 * @param overlap 当たり判定
 * @return 判定結果
 */
export function onOverlap(origin: SliderOperationModel, overlap: number[]): ChangeValue | NotChangeValue {
  if (overlap.length <= 0) {
    return createNoChangeValue(origin);
  }

  const value = overlap.reduce((a, b) => Math.max(a, b));
  if (origin.lastValue === value) {
    return createNoChangeValue(origin);
  }

  return createChangeValue(origin, value);
}

/** 値が変更されなかった場合の戻り値を生成する */
function createNoChangeValue(origin: SliderOperationModel): NotChangeValue {
  return {
    update: origin,
    isValueChanged: false,
  };
}

/** 値が変更された場合の戻り値を生成する */
function createChangeValue(origin: SliderOperationModel, value: number): ChangeValue {
  return {
    update: {
      ...origin,
      lastValue: value
    },
    isValueChanged: true,
    value: value
  };
}