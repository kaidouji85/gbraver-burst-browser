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

/** イベント通知 */
type Notifier = {
  battleAction: Observable<BattleSceneAction>
}

/** HUDレイヤーのゲームオブジェクト */
export class HUDGameObjects {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  playInLandscape: PlayInLandscape;
  fader: Fader;

  _battleAction: Subject<BattleSceneAction>;

  constructor(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player) {
    this._battleAction = new Subject();

    this.batterySelector = new BatterySelector({
      listener: listener,
      maxBattery: playerInfo.armdozer.maxBattery,
      resources: resources,
      onBatteryChange: (battery: number) => {
        this._battleAction.next({
          type: 'changeBattery',
          battery: battery
        });
      },
      onOkButtonPush: () => {
        this._battleAction.next({
          type: 'decideBattery',
          battery: this.batterySelector.getBattery()
        });
      }
    });

    this.burstButton = new BurstButton({
      resources: resources,
      listener: listener,
      onPush: () => {
        this._battleAction.next({
          type: 'doBurst'
        });
      }
    });

    this.playInLandscape = new PlayInLandscape(resources, listener);

    this.fader = new Fader({
      isVisible: true,
      listener: listener
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.batterySelector.destructor();
    this.burstButton.destructor();
    this.playInLandscape.destructor();
    this.fader.destructor();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      battleAction: this._battleAction
    };
  }

  /**
   * HUDゲームオブジェクトをシーンに追加する
   *
   * @param scene 追加対象シーン
   */
  appendScene(scene: THREE.Scene): void {
    scene.add(this.batterySelector.getObject3D());
    scene.add(this.burstButton.getObject3D());
    scene.add(this.playInLandscape.getObject3D());
    scene.add(this.fader.getObject3D());
  }
}
