// @flow
import {PlayerHpGaugeState} from '../index';
import {PlayerHpGauge} from '../target';

export class Battle implements PlayerHpGaugeState {
  hp: number;
  maxHp: number;

  constructor() {
    this.hp = 0;
    this.maxHp = 0;
  }

  start(hp: number, maxHp: number) {
    this.hp = hp;
    this.maxHp = maxHp;
  }

  gameLoop(target: PlayerHpGauge): void {
    const isRefresh = this.hp !== target.hp || this.maxHp !== target.maxHp;
    if (isRefresh) {
      target.refresh(this.hp, this.maxHp);
    }

    target.mesh.position.x = (window.innerWidth - target.meshWidth) / 2;
    target.mesh.position.y = (window.innerHeight - target.meshHeight) / 2;
  }
}