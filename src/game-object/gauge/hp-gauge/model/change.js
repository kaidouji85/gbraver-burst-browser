// @flow
import type {HpGaugeModel} from "./hp-gauge-model";
import {Tween} from '@tweenjs/tween.js';

const SPEED = 3000;

export function change(model: HpGaugeModel, toHp: number): Tween {
  const duration = SPEED * (model.hp - toHp) / model.maxHp
  return new Tween(model)
    .to({hp: toHp}, duration);
}