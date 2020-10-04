// @flow

import {BatterySelector} from "../../../../../game-object/battery-selector";
import {BurstButton} from "../../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../../resource";
import {Observable, Subscription} from "rxjs/index";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import type {BattleSceneAction} from "../../actions";
import type {Player} from "gbraver-burst-core";
import * as THREE from "three";
import {Subject} from "rxjs";
import {Fader} from "../../../../../game-object/fader/fader";
import {frontmostFader, rearmostFader} from "../../../../../game-object/fader";
import {PilotButton} from "../../../../../game-object/pilot-button";

/** イベント通知 */
type Notifier = {
  battleSceneAction: Observable<BattleSceneAction>
};

/**
 * HUDレイヤーのゲームオブジェクト
 */
export class HUDGameObjects {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  pilotButton: PilotButton;
  frontmostFader: Fader;
  rearmostFader: Fader;
  _battleSceneAction: Subject<BattleSceneAction>;
  _subscriptions: typeof Subscription[];

  constructor(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player) {
    this._battleSceneAction = new Subject();

    this.batterySelector = new BatterySelector({
      listener: listener,
      maxBattery: playerInfo.armdozer.maxBattery,
      resources: resources,
      onBatteryChange: (battery: number) => {
        this._battleSceneAction.next({
          type: 'changeBattery',
          battery: battery
        });
      },
      onOkButtonPush: () => {
        this._battleSceneAction.next({
          type: 'decideBattery',
          battery: this.batterySelector.getBattery()
        });
      }
    });
    this.burstButton = new BurstButton({
      resources: resources,
      listener: listener,
      onPush: () => {
        this._battleSceneAction.next({
          type: 'doBurst'
        });
      }
    });
    this.pilotButton = new PilotButton(resources, listener);

    this.frontmostFader = frontmostFader({
      listener: listener,
      isVisible: false,
    });
    this.rearmostFader = rearmostFader({
      listener: listener,
      isVisible: false,
    });

    this._subscriptions = [
      this.pilotButton.notifier().pushButton.subscribe(() => {
        this._battleSceneAction.next({type: 'doPilotSkill'});
      })
    ];
  }

  /**
   * デスタラクタ相当の処理
   */
  destructor(): void {
    this.batterySelector.destructor();
    this.burstButton.destructor();
    this.pilotButton.destructor();
    this.rearmostFader.destructor();
    this.frontmostFader.destructor();
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D {
    return [
      this.batterySelector.getObject3D(),
      this.burstButton.getObject3D(),
      this.pilotButton.getObject3D(),
      this.rearmostFader.getObject3D(),
      this.frontmostFader.getObject3D(),
    ];
  }

  /**
   * イベント通知
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      battleSceneAction: this._battleSceneAction
    }
  }
}