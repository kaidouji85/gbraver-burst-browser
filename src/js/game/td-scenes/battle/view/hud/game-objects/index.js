// @flow
import {BatterySelector} from "../../../../../../game-object/battery-selector";
import {BurstButton} from "../../../../../../game-object/burst-button/burst-button";
import type {Resources} from "../../../../../../resource";
import type {BattleSceneAction} from "../../../actions";
import type {Player} from "gbraver-burst-core";
import * as THREE from "three";
import {Fader} from "../../../../../../game-object/fader/fader";
import {frontmostFader, rearmostFader} from "../../../../../../game-object/fader";
import {PilotButton} from "../../../../../../game-object/pilot-button/pilot-button";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream, StreamSource, Unsubscriber} from "../../../../../../stream/core";
import {RxjsStreamSource} from "../../../../../../stream/rxjs";
import {createBurstButton} from "./burst-button";
import {createPilotButton} from "./pilot-button";
import {ResultIndicator} from "../../../../../../game-object/result-indicator/result-indicator";
import {loseIndicator, winIndicator} from "../../../../../../game-object/result-indicator";

/**
 * HUDレイヤーのゲームオブジェクト
 */
export class HUDGameObjects {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  pilotButton: PilotButton;
  frontmostFader: Fader;
  rearmostFader: Fader;
  win: ResultIndicator;
  lose: ResultIndicator;
  _battleAction: StreamSource<BattleSceneAction>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param playerInfo プレイヤー情報
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>, playerInfo: Player) {
    this._battleAction = new RxjsStreamSource();

    this.batterySelector = new BatterySelector({
      gameObjectAction: gameObjectAction,
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
    this.burstButton = createBurstButton(resources, gameObjectAction, playerInfo.armdozer.id);
    this.pilotButton = createPilotButton(resources, gameObjectAction, playerInfo.pilot.id);

    this.frontmostFader = frontmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false,
    });
    this.rearmostFader = rearmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false,
    });

    this.win = winIndicator(resources, gameObjectAction);
    this.lose = loseIndicator(resources, gameObjectAction);

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
    this.win.destructor();
    this.lose.destructor();
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
      this.win.getObject3D(),
      this.lose.getObject3D(),
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