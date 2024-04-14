import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { BatterySelector } from "../../../../../game-object/battery-selector";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import {
  frontmostFader,
  rearmostFader,
} from "../../../../../game-object/fader";
import { Fader } from "../../../../../game-object/fader/fader";
import {
  batterySelectorLeadLine,
  burstButtonLeadLine,
  pilotButtonLeadLine,
} from "../../../../../game-object/lead-line";
import { LeadLine } from "../../../../../game-object/lead-line/lead-line";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import { drawIndicator } from "../../../../../game-object/result-indicator";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { TimeScaleButton } from "../../../../../game-object/time-scale-button/time-scale-button";
import type { BattleSceneAction } from "../../../actions";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import { createBurstButton } from "./burst-button";
import { createPilotButton } from "./pilot-button";

/** HUDレイヤーのゲームオブジェクト */
export class HUDGameObjects {
  /** バッテリーセレクタ */
  batterySelector: BatterySelector;
  /** バッテリーセレクタの引き出し線 */
  batterySelectorLeadLine: LeadLine;
  /** バーストボタン */
  burstButton: BurstButton;
  /** バーストボタンの引き出し線 */
  burstButtonLeadLine: LeadLine;
  /** パイロットボタン */
  pilotButton: PilotButton;
  /** パイロットボタンの引き出し線 */
  pilotButtonLeadLine: LeadLine;
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
   * @param params 生成パラメータ
   */
  constructor(params: GenerateHUDLayerObjectParams) {
    const { resources, gameObjectAction } = params;
    this.#battleAction = new Subject();
    this.batterySelector = new BatterySelector(params);
    this.batterySelectorLeadLine = batterySelectorLeadLine(gameObjectAction);
    this.burstButton = createBurstButton(params);
    this.burstButtonLeadLine = burstButtonLeadLine(gameObjectAction);
    this.pilotButton = createPilotButton(params);
    this.pilotButtonLeadLine = pilotButtonLeadLine(gameObjectAction);
    this.timeScaleButton = new TimeScaleButton(params);
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
    this.batterySelectorLeadLine.destructor();
    this.burstButton.destructor();
    this.burstButtonLeadLine.destructor();
    this.pilotButton.destructor();
    this.pilotButtonLeadLine.destructor();
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
      this.batterySelectorLeadLine.getObject3D(),
      this.burstButton.getObject3D(),
      this.burstButtonLeadLine.getObject3D(),
      this.pilotButton.getObject3D(),
      this.pilotButtonLeadLine.getObject3D(),
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
