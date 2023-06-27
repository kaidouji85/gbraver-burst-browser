import type { Player } from "gbraver-burst-core";
import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import { BatterySelector } from "../../../../../game-object/battery-selector";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import {
  frontmostFader,
  rearmostFader,
} from "../../../../../game-object/fader";
import { Fader } from "../../../../../game-object/fader/fader";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import { drawIndicator } from "../../../../../game-object/result-indicator";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { TimeScaleButton } from "../../../../../game-object/time-scale-button/time-scale-button";
import type { Resources } from "../../../../../resource";
import type { BattleSceneAction } from "../../../actions";
import { createBurstButton } from "./burst-button";
import { createPilotButton } from "./pilot-button";

/**
 * HUDレイヤーのゲームオブジェクト
 */
export class HUDGameObjects {
  /** バッテリーセレクタ */
  batterySelector: BatterySelector;
  /** バーストボタン */
  burstButton: BurstButton;
  /** パイロットボタン */
  pilotButton: PilotButton;
  /** アニメーションタイムスケールボタン */
  timeScaleButton: TimeScaleButton;
  /** フェーダ（最前列） */
  frontmostFader: Fader;
  /** フェーダ（最後尾） */
  rearmostFader: Fader;
  /** 引き分けインジケータ */
  drawIndicator: ResultIndicator;
  /** 戦闘シーンアクション */
  #battleAction: Subject<BattleSceneAction>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   * @param playerInfo プレイヤー情報
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
    playerInfo: Player
  ) {
    this.#battleAction = new Subject();
    this.batterySelector = new BatterySelector({
      gameObjectAction: gameObjectAction,
      resources: resources,
    });
    this.burstButton = createBurstButton(
      resources,
      gameObjectAction,
      playerInfo.armdozer.id
    );
    this.pilotButton = createPilotButton(
      resources,
      gameObjectAction,
      playerInfo.pilot.id
    );
    this.timeScaleButton = new TimeScaleButton(resources, gameObjectAction);
    this.frontmostFader = frontmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false,
    });
    this.rearmostFader = rearmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false,
    });
    this.drawIndicator = drawIndicator(resources, gameObjectAction);
    this.#unsubscribers = [
      this.batterySelector.notifyBatteryPlus().subscribe(() => {
        this.#battleAction.next({
          type: "plusBattery",
        });
      }),
      this.batterySelector.notifyBatteryMinus().subscribe(() => {
        this.#battleAction.next({
          type: "minusBattery",
        });
      }),
      this.batterySelector.notifyDecision().subscribe((event) => {
        this.#battleAction.next({
          type: "decideBattery",
          battery: this.batterySelector.getBattery(),
          event,
        });
      }),
      this.burstButton.notifyPressed().subscribe((event) => {
        this.#battleAction.next({
          type: "doBurst",
          event,
        });
      }),
      this.pilotButton.notifyPressed().subscribe((event) => {
        this.#battleAction.next({
          type: "doPilotSkill",
          event,
        });
      }),
      this.timeScaleButton.notifyToggled().subscribe((timeScale) => {
        this.#battleAction.next({
          type: "toggleTimeScale",
          timeScale,
        });
      }),
    ];
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
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.batterySelector.getObject3D(),
      this.burstButton.getObject3D(),
      this.pilotButton.getObject3D(),
      this.timeScaleButton.getObject3D(),
      this.rearmostFader.getObject3D(),
      this.frontmostFader.getObject3D(),
      this.drawIndicator.getObject3D(),
    ];
  }

  /**
   * 戦闘シーンアクションを通知する
   *
   * @return 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction> {
    return this.#battleAction;
  }
}
