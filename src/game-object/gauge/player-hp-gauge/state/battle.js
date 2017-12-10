// @flow
import {PlayerHpGaugeState} from '../index';
import {PlayerHpGauge} from '../target';
import {Tween} from 'tween.js';

/** HPゲージ変化のスピード(HP量/秒) */
const SPEED = 1500;

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

  start(hp: number, maxHp: number) {
    const time = (hp - this._hp) / SPEED * 1000;
    this._maxHp = maxHp;
    this._tween
      .to({_hp: hp}, time)
      .delay(1000)
      .start();
  }

  gameLoop(target: PlayerHpGauge): void {
    target.refresh(this._hp, this._maxHp);
    target.mesh.position.x = (window.innerWidth - target.meshWidth) / 2;
    target.mesh.position.y = (window.innerHeight - target.meshHeight) / 2;
  }
}