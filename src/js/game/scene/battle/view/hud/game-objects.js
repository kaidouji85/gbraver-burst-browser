// @flow

import {BatterySelector} from "../../../../../game-object/battery-selector";
import {BurstButton} from "../../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs/index";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import type {BattleSceneAction} from "../../../../../action/battle-scene";
import type {Player} from "gbraver-burst-core/lib/player/player";
import * as THREE from "three";
import {PlayInLandscape} from "../../../../../game-object/warning/play-in-landscape";
import {Subject} from "rxjs";
import {Fader} from "../../../../../game-object/fader/fader";

/** HUDレイヤーのゲームオブジェクト */
export type HUDGameObjects = {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  playInLandscape: PlayInLandscape;
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

  const playInLandscape = new PlayInLandscape(resources, listener);

  const fader = new Fader();

  return {
    batterySelector: batterySelector,
    burstButton: burstButton,
    playInLandscape: playInLandscape,
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
  scene.add(target.playInLandscape.getObject3D());
  scene.add(target.fader.getObject3D());
}

/**
 * HUDゲームオブジェクトのデストラクタ相当処理
 *
 * @param target デストラクト対象
 */
export function destructorHUDGameObjects(target: HUDGameObjects): void {
  target.batterySelector.destructor();
  target.burstButton.destructor();
  target.playInLandscape.destructor();
}