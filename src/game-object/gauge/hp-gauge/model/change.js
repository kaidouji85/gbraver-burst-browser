// @flow
import type {HpGaugeModel} from "./hp-gauge-model";
import {Tween, Group} from '@tweenjs/tween.js';

const SPEED = 3000;

export function change(model: HpGaugeModel, tweenGroup: Group, toHp: number): Tween {
  const duration = SPEED * (model.hp - toHp) / model.maxHp;
  return new Tween(model, tweenGroup)
    .to({hp: toHp}, duration);
}