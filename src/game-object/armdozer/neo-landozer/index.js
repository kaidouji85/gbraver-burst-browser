// @flow

import type {Resources} from "../../../resource/index";
import {NeoLandozer} from './neo-landozer';
import {PlayerNeoLandozerView} from "./view/player-neo-landozer-view";
import {EnemyNeoLandozerView} from "./view/enemy-neo-landozer-view";
import {Observable} from "rxjs";
import type {SpriteGameLoop} from "../../../action/sprite/sprite-game-loop";

/** プレイヤー側ネオランドーザ */
export function PlayerNeoLandozer(resources: Resources, listener: Observable<SpriteGameLoop>): NeoLandozer {
  const view = new PlayerNeoLandozerView(resources);
  return new NeoLandozer({view, listener});
}

/** 敵側ネオランドーザ */
export function EnemyNeoLandozer(resources: Resources, listener: Observable<SpriteGameLoop>): NeoLandozer {
  const view = new EnemyNeoLandozerView(resources);
  return new NeoLandozer({view, listener});
}