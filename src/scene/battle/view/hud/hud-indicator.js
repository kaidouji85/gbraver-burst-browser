// @flow

import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import {Gauge} from "../../../../game-object/gauge/gauge";
import {enemyGauge, playerGauge} from "../../../../game-object/gauge";
import type {Resources} from "../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action";

export type HUDIndicator = {
  playerId: PlayerId,
  gauge: Gauge,
};

export function addHUDIndicator(scene: THREE.Scene, hud: HUDIndicator) {
  scene.add(hud.gauge.getObject3D());
}

export function playerHUD(resources: Resources, listener: Observable<GameObjectAction>, player: Player): HUDIndicator {
  return {
    playerId: player.playerId,
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: player.armdozer.maxHp,
      battery: player.armdozer.maxBattery,
    })
  };
}

export function enemyHUD(resources: Resources, listener: Observable<GameObjectAction>, player: Player): HUDIndicator {
  return {
    playerId: player.playerId,
    gauge: enemyGauge({
      resources: resources,
      listener: listener,
      hp: player.armdozer.maxHp,
      battery: player.armdozer.maxBattery,
    })
  };
}