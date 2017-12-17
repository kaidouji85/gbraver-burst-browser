// @flow
import {HpGaugeState} from '../base'
import type {HpGaugeModel} from "../base";
import {Tween} from 'tween.js';

/** 最小値から最大値までにかかる時間(ミリ秒) */
const BASE_TIME = 1000;

/**
 * 戦闘画面での状態
 * 本状態ではHPが増減した場合、徐々に目的の値に近づいていく
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

  /**
   * 本状態を開始する際に呼び出す関数
   *
   * @param model HPゲージモデル
   * @param toHp 完了するHP
   */
  start(model: HpGaugeModel, toHp: number) {
    const duration = Math.abs(toHp - model.hp) / model.maxHp * BASE_TIME;
    this._hp = model.hp;
    this._tween
      .to({_hp: toHp}, duration)
      .delay(1000)
      .start();
  }

  /** モデルを更新する */
  gameLoop(model: HpGaugeModel): HpGaugeModel {
    return Object.assign({}, model, {hp: this._hp});
  }
}