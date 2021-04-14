// @flow

import {BatterySelector} from "../../../../../game-object/battery-selector";
import {BurstButton} from "../../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../../resource";
import type {BattleSceneAction} from "../../actions";
import type {Player} from "gbraver-burst-core";
import * as THREE from "three";
import {Fader} from "../../../../../game-object/fader/fader";
import {frontmostFader, rearmostFader} from "../../../../../game-object/fader";
import {PilotButton} from "../../../../../game-object/pilot-button";
import type {GameObjectAction} from "../../../../../game-object/action/game-object-action";
import type {Stream, StreamSource, Unsubscriber} from "../../../../../stream/core";
import {RxjsStreamSource} from "../../../../../stream/rxjs";

/**
 * HUDレイヤーのゲームオブジェクト
 */
export class HUDGameObjects {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  pilotButton: PilotButton;
  frontmostFader: Fader;
  rearmostFader: Fader;
  _battleAction: StreamSource<BattleSceneAction>;
  _unsubscribers: Unsubscriber[];

  constructor(resources: Resources, listener: Stream<GameObjectAction>, playerInfo: Player) {
    this._battleAction = new RxjsStreamSource();

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
      armDozerId: playerInfo.armdozer.id,
    });
    this.pilotButton = new PilotButton(resources, playerInfo.pilot.id, listener);

    this.frontmostFader = frontmostFader({
      listener: listener,
      isVisible: false,
    });
    this.rearmostFader = rearmostFader({
      listener: listener,
      isVisible: false,
    });

    this._unsubscribers = [
      this.burstButton.pushButtonNotifier().subscribe(() => {
        this._battleAction.next({type: 'doBurst'})
      }),
      this.pilotButton.pushButtonNotifier().subscribe(() => {
        this._battleAction.next({type: 'doPilotSkill'});
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
    this._unsubscribers.forEach(v => {
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
   * 戦闘シーンアクションを通知する
   *
   * @return 通知ストリーム
   */
  battleActionNotifier(): Stream<BattleSceneAction> {
    return this._battleAction;
  }
}