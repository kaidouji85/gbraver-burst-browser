import type { Player } from "gbraver-burst-core";
import * as THREE from "three";
import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import { BatterySelector } from "../../../../../game-object/battery-selector";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import { frontmostFader, rearmostFader } from "../../../../../game-object/fader";
import { Fader } from "../../../../../game-object/fader/fader";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import { drawIndicator } from "../../../../../game-object/result-indicator";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { TimeScaleButton } from "../../../../../game-object/time-scale-button/time-scale-button";
import type { Resources } from "../../../../../resource";
import type { Stream, StreamSource, Unsubscriber } from "../../../../../stream/stream";
import { createStreamSource } from "../../../../../stream/stream";
import type { BattleSceneAction } from "../../../actions";
import { createBurstButton } from "./burst-button";
import { createPilotButton } from "./pilot-button";

/**
 * HUDレイヤーのゲームオブジェクト
 */
export class HUDGameObjects {
  batterySelector: BatterySelector;
  burstButton: BurstButton;
  pilotButton: PilotButton;
  timeScaleButton: TimeScaleButton;
  frontmostFader: Fader;
  rearmostFader: Fader;
  drawIndicator: ResultIndicator;
  #battleAction: StreamSource<BattleSceneAction>;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param playerInfo プレイヤー情報
   */
  constructor(resources: Resources, gameObjectAction: Stream<GameObjectAction>, playerInfo: Player) {
    this.#battleAction = createStreamSource();
    this.batterySelector = new BatterySelector({
      gameObjectAction: gameObjectAction,
      maxBattery: playerInfo.armdozer.maxBattery,
      resources: resources
    });
    this.burstButton = createBurstButton(resources, gameObjectAction, playerInfo.armdozer.id);
    this.pilotButton = createPilotButton(resources, gameObjectAction, playerInfo.pilot.id);
    this.timeScaleButton = new TimeScaleButton(resources, gameObjectAction);
    this.frontmostFader = frontmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false
    });
    this.rearmostFader = rearmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false
    });
    this.drawIndicator = drawIndicator(resources, gameObjectAction);
    this.#unsubscribers = [this.batterySelector.batteryPlusPushNotifier().subscribe(() => {
      this.#battleAction.next({
        type: "plusBattery"
      });
    }), this.batterySelector.batteryMinusPushNotifier().subscribe(() => {
      this.#battleAction.next({
        type: "minusBattery"
      });
    }), this.batterySelector.decidePushNotifier().subscribe(event => {
      this.#battleAction.next({
        type: "decideBattery",
        battery: this.batterySelector.getBattery(),
        event
      });
    }), this.burstButton.pushButtonNotifier().subscribe(event => {
      this.#battleAction.next({
        type: "doBurst",
        event
      });
    }), this.pilotButton.pushButtonNotifier().subscribe(event => {
      this.#battleAction.next({
        type: "doPilotSkill",
        event
      });
    }), this.timeScaleButton.toggleNotifier().subscribe(timeScale => {
      this.#battleAction.next({
        type: "toggleTimeScale",
        timeScale
      });
    })];
  }

  /**
   * デスタラクタ相当の処理
   */
  destructor(): void {
    this.batterySelector.destructor();
    this.burstButton.destructor();
    this.pilotButton.destructor();
    this.timeScaleButton.destructor();
    this.rearmostFader.destructor();
    this.frontmostFader.destructor();
    this.drawIndicator.destructor();
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [this.batterySelector.getObject3D(), this.burstButton.getObject3D(), this.pilotButton.getObject3D(), this.timeScaleButton.getObject3D(), this.rearmostFader.getObject3D(), this.frontmostFader.getObject3D(), this.drawIndicator.getObject3D()];
  }

  /**
   * 戦闘シーンアクションを通知する
   *
   * @return 通知ストリーム
   */
  battleActionNotifier(): Stream<BattleSceneAction> {
    return this.#battleAction;
  }

}