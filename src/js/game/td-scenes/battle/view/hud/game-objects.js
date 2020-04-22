// @flow

import {BatterySelector} from "../../../../../game-object/battery-selector";
import {BurstButton} from "../../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs/index";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import type {BattleSceneAction} from "../../../../../action/battle-scene";
import type {Player} from "gbraver-burst-core";
import * as THREE from "three";
import {Subject} from "rxjs";
import {Fader} from "../../../../../game-object/fader/fader";
import {frontmostFader, rearmostFader} from "../../../../../game-object/fader";

/** HUDレイヤーのゲームオブジェクト フィールド */
interface HUDGameObjectsField {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  frontmostFader: Fader;
  rearmostFader: Fader;
  notifier: {
    battleSceneAction: Observable<BattleSceneAction>
  }
}

/**
 * HUDレイヤーのゲームオブジェクト
 */
export class HUDGameObjects implements HUDGameObjectsField {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  frontmostFader: Fader;
  rearmostFader: Fader;
  notifier: {
    battleSceneAction: Observable<BattleSceneAction>
  }

  constructor(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player) {
    const battleSceneAction = new Subject();

    this.batterySelector = new BatterySelector({
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
          battery: this.batterySelector.getBattery()
        });
      }
    });
    this.burstButton = new BurstButton({
      resources: resources,
      listener: listener,
      onPush: () => {
        battleSceneAction.next({
          type: 'doBurst'
        });
      }
    });
    this.frontmostFader = frontmostFader({
        listener: listener,
        isVisible: true,
      });
    this.rearmostFader = rearmostFader({
        listener: listener,
        isVisible: false,
      });
      this.notifier = {
        battleSceneAction: battleSceneAction
      };
  }
}

// TODO 削除する
/**
 * HUDレイヤーゲームオブジェクトをシーンに追加する
 *
 * @param scene 追加するシーン
 * @param target HUDレイヤーゲームオブジェクト
 */
export function appendHUDGameObjects(scene: THREE.Scene, target: HUDGameObjects): void {
  scene.add(target.batterySelector.getObject3D());
  scene.add(target.burstButton.getObject3D());
  scene.add(target.rearmostFader.getObject3D());
  scene.add(target.frontmostFader.getObject3D());
}

// TODO 削除する
/**
 * HUDゲームオブジェクトのリソースを破棄する
 *
 * @param target リソース破棄対象
 */
export function disposeHUDGameObjects(target: HUDGameObjects): void {
  target.batterySelector.destructor();
  target.burstButton.destructor();
  target.rearmostFader.destructor();
  target.frontmostFader.destructor();
}