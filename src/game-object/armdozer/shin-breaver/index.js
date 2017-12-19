// @flow

import type {Resources} from "../../../resource/resource-manager";
import {ShinBraver} from './base';
import {PlayerShinBraverView} from "./view/player-shin-braver";

/** プレイヤー側シンブレイバー */
export function PlayerShinBraver(resources: Resources): ShinBraver {
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver({view});
}