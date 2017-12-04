// @flow
import {MESH_HEIGHT, MESH_WIDTH, PlayerGaugeTarget} from "../target";
import {PlayerGaugeState} from '../index';

/** 戦闘状態 */
export class Battle implements PlayerGaugeState {
  gameLoop(target: PlayerGaugeTarget): void {
    target.mesh.position.x = (window.innerWidth - MESH_WIDTH) / 2;
    target.mesh.position.y = (window.innerHeight - MESH_HEIGHT) / 2;
  }
}