// @flow

import type {Resources} from "../../../resource/index";
import {NeoLandozer} from './neo-landozer';
import {PlayerNeoLandozerView} from "./view/player-neo-landozer-view";
import {EnemyNeoLandozerView} from "./view/enemy-neo-landozer-view";

/** プレイヤー側ネオランドーザ */
export function PlayerNeoLandozer(resources: Resources): NeoLandozer {
  const view = new PlayerNeoLandozerView(resources);
  return new NeoLandozer({view});
}

/** 敵側ネオランドーザ */
export function EnemyNeoLandozer(resources: Resources): NeoLandozer {
  const view = new EnemyNeoLandozerView(resources);
  return new NeoLandozer({view});
}