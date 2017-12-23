// @flow
import {HpGaugeState} from '../base'
import type {HpGaugeModel} from "../base";
import {Tween} from '@tweenjs/tween.js';

/** 最小値から最大値までにかかる時間(ミリ秒) */
const BASE_TIME = 1000;

/**
 * 指定したHPに徐々に近づいていく
 */
export class ChangeGradually implements HpGaugeState {
  /** 現在のHP */
  _hp: number;
  /** tweenオブジェクト */
  _tween: Tween;

  constructor() {
    this._hp = 0;
    this._tween = new Tween(this);
  }

  /** 状態開始 */
  start(model: HpGaugeModel, toHp: number) {
    const duration = Math.abs(toHp - model.hp) / model.maxHp * BASE_TIME;
    this._hp = model.hp;
    this._tween
      .to({_hp: toHp}, duration)
      .delay(1000)
      .start();
  }

  /** 状態終了 */
  stop() {
    this._tween.stop();
  }

  /** モデルを更新する */
  gameLoop(model: HpGaugeModel): HpGaugeModel {
    return Object.assign({}, model, {hp: this._hp});
  }
}