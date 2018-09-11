// @flow

import type {DamageIndicatorModel} from "./damage-indicator-model";

/** ダメージインジケータモデルの初期値を生成する */
export function createInitialValue(): DamageIndicatorModel {
  return {
    damage: 0,
    opacity: 0
  };
}