// @flow

import {BatterySelector} from "../../../../../../../game-object/battery-selector";
import {BurstButton} from "../../../../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../../../../resource";
import {Observable} from "rxjs/index";
import type {GameObjectAction} from "../../../../../../../action/game-object-action";
import type {BattleSceneAction} from "../../../../../../../action/battle-scene";
import type {Player} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import {Subject} from "rxjs";
import {Fader} from "../../../../../../../game-object/fader/fader";

/** HUDレイヤーのゲームオブジェクト */
export type HUDGameObjects = {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  fader: Fader;
  notifier: {
    battleSceneAction: Observable<BattleSceneAction>
  }
};

/**
 * HUDレイヤーゲームオブジェクトを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param playerInfo プレイヤーの情報
 * @return HUDゲームオブジェクト
 */
export function createHUDGameObjects(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player): HUDGameObjects {
  const battleSceneAction = new Subject();

  const batterySelector = new BatterySelector({
    listener: listener,
    maxBattery: playerInfo.armdozer.maxBattery,
    resources: resources,
    onBatteryChange: (battery: number) => {
      battleSceneAction.next({
        type: 'changeBattery',
        battery: battery
      });
    },
    onOkButtonPush: () => {
      battleSceneAction.next({
        type: 'decideBattery',
        battery: batterySelector.getBattery()
      });
    }
  });

  const burstButton = new BurstButton({
    resources: resources,
    listener: listener,
    onPush: () => {
      battleSceneAction.next({
        type: 'doBurst'
      });
    }
  });

  const fader = new Fader({
    isVisible: true,
    listener: listener
  });

  return {
    batterySelector: batterySelector,
    burstButton: burstButton,
    fader: fader,
    notifier: {
      battleSceneAction: battleSceneAction
    }
  };
}

/**
 * HUDレイヤーゲームオブジェクトをシーンに追加する
 *
 * @param scene 追加するシーン
 * @param target HUDレイヤーゲームオブジェクト
 */
export function appendHUDGameObjects(scene: THREE.Scene, target: HUDGameObjects): void {
  scene.add(target.batterySelector.getObject3D());
  scene.add(target.burstButton.getObject3D());
  scene.add(target.fader.getObject3D());
}

/**
 * HUDゲームオブジェクトのリソースを破棄する
 *
 * @param target リソース破棄対象
 */
export function disposeHUDGameObjects(target: HUDGameObjects): void {
  target.batterySelector.destructor();
  target.burstButton.destructor();
}