// @flow

import type {Resources} from "../../../resource/index";
import {ShinBraver} from './shin-breaver';
import {PlayerShinBraverView} from "./view/player-shin-braver-view";
import {EnemyShinBraverView} from "./view/enemy-shin-braver-view";
import {Observable} from "rxjs";
import type {SpriteGameLoop} from "../../../action/sprite/armdozer-game-loop";

/** プレイヤー側シンブレイバー */
export function PlayerShinBraver(resources: Resources, listener: Observable<SpriteGameLoop>): ShinBraver {
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver({view, listener});
}

/** 敵側シンブレイバー */
export function EnemyShinBraver(resources: Resources, listener: Observable<SpriteGameLoop>): ShinBraver {
  const view = new EnemyShinBraverView(resources);
  return new ShinBraver({view, listener});
}