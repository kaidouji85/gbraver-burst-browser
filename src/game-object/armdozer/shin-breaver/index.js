// @flow

import type {Resources} from "../../../resource/resource-manager";
import {ShinBraver} from './base';
import {PlayerShinBraverView} from "./view/player-shin-braver";
import {EnemyShinBraverView} from "./view/enemy-shin-braver";

/** プレイヤー側シンブレイバー */
export function PlayerShinBraver(resources: Resources): ShinBraver {
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver({view});
}

/** 敵側シンブレイバー */
export function EnemyShinBraver(resources: Resources): ShinBraver {
  const view = new EnemyShinBraverView(resources);
  return new ShinBraver({view});
}