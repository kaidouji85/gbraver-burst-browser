// @flow
import {PlayerHpGaugeState} from '../index';
import {PlayerHpGauge} from '../target';
import {Tween, Easing} from 'tween.js';

/** HPゲージ変化のスピード(HP量/秒) */
const SPEED = 1500;

/** 戦闘状態 */
export class Battle implements PlayerHpGaugeState {
  /** 現在のHP */
  _hp: number;
  /** 最大HP */
  _maxHp: number;
  /** tweenオブジェクト */
  _tween: Tween;

  constructor() {
    this._hp = 0;
    this._maxHp = 0;
    this._tween = new Tween(this);
  }

  start(fromHp: number, toHp: number, maxHp: number) {
    const duration = (toHp - fromHp) / SPEED * 1000;
    this._hp = fromHp;
    this._maxHp = maxHp;
    this._tween
      .to({_hp: toHp}, duration)
      .delay(1000)
      .easing(Easing.Cubic.Out)
      .start();
  }

  gameLoop(target: PlayerHpGauge): void {
    target.refreshGauge(this._hp, this._maxHp);
    target.refreshPos();
  }
}