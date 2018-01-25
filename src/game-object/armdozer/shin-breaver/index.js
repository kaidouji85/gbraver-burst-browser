// @flow

import type {Resources} from "../../../resource/index";
import {ShinBraver} from './shin-breaver';
import {PlayerShinBraverView} from "./view/player-shin-braver-view";
import {EnemyShinBraverView} from "./view/enemy-shin-braver-view";

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