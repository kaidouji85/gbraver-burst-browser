// @flow

import {BatterySelector} from "../../../../game-object/battery-selector";
import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../resource";
import {Observable, Observer} from "rxjs/index";
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {Player} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";

/** HUDレイヤーのゲームオブジェクト */
export type HUDGameObjects = {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
};

export function createHUDGameObjects(resources: Resources, listener: Observable<GameObjectAction>, notifier: Observer<BattleSceneAction>, playerInfo: Player) {
  const batterySelector = new BatterySelector({
    listener: listener,
    maxBattery: playerInfo.armdozer.maxBattery,
    resources: resources,
    onBatteryChange: (battery: number) => {
      notifier.next({
        type: 'changeBattery',
        battery: battery
      });
    },
    onOkButtonPush: () => {
      notifier.next({
        type: 'decideBattery',
        battery: batterySelector.getBattery()
      });
    }
  });
  const burstButton = new BurstButton({
    resources: resources,
    listener: listener
  });

  return {
    batterySelector: batterySelector,
    burstButton: burstButton,
  };
}

export function appendHUDGameObjects(scene: THREE.Scene, target: HUDGameObjects): void {
  scene.add(target.batterySelector.getObject3D());
  scene.add(target.burstButton.getObject3D());
}

