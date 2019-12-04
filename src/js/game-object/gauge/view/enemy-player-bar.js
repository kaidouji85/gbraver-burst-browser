// @flow

import type {Resources} from "../../../resource";
import {PlayerHpBar} from "./player-hp-bar";

/** 敵のHPバー */
export class EnemyHpBar extends PlayerHpBar {
  constructor(resources: Resources) {
    super(resources);
    this._group.scale.x = -1;
    this._group.position.x *= -1;
  }
}