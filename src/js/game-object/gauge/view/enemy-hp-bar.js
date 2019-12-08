// @flow

import type {Resources} from "../../../resource";
import {PlayerHpBar} from "./player-hp-bar";

/** 敵のHPバー */
export class EnemyHpBar extends PlayerHpBar {
  constructor(resources: Resources) {
    super(resources);
    this.getObject3D().scale.x = -1;
  }
}