// @flow

import {BatterySelector} from "../../../../game-object/battery-selector";
import {BurstButton} from "../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../resource";
import {Observable, Observer} from "rxjs/index";
import type {GameObjectAction} from "../../../../action/game-object-action";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {Player} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import {PlayInLandscape} from "../../../../game-object/warning/play-in-landscape";

/** HUDレイヤーのゲームオブジェクト */
export type HUDGameObjects = {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  playInLandscape: PlayInLandscape;
};

/**
 * HUDレイヤーゲームオブジェクトを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param notifier イベント通知
 * @param playerInfo プレイヤーの情報
 * @return HUDゲームオブジェクト
 */
export function createHUDGameObjects(resources: Resources, listener: Observable<GameObjectAction>, notifier: Observer<BattleSceneAction>, playerInfo: Player): HUDGameObjects {
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
    listener: listener,
    onPush: () => {
      notifier.next({
        type: 'doBurst'
      });
    }
  });

  const playInLandscape = new PlayInLandscape(resources, listener);

  return {
    batterySelector: batterySelector,
    burstButton: burstButton,
    playInLandscape: playInLandscape,
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
  scene.add(target.playInLandscape.getObject3D());
}

/**
 * HUDゲームオブジェクトのデストラクタ相当処理
 *
 * @param target デストラクト対象
 */
export function destructorHUDGameObjects(target: HUDGameObjects): void {
  target.batterySelector.destructor();
  target.burstButton.destructor();
}