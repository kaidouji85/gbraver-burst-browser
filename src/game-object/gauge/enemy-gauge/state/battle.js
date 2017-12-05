// @flow

import type {EnemyGaugeState} from "../index";
import {EnemyGauge} from "../target";
import {MESH_HEIGHT, MESH_WIDTH} from "../../player-gauge/target";

/** 戦闘状態 */
export class Battle implements EnemyGaugeState {
  gameLoop(target: EnemyGauge): void {
    target.mesh.position.x = (-window.innerWidth + MESH_WIDTH) / 2;
    target.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;
  }
}