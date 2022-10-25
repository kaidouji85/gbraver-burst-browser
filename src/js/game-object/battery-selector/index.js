// @flow

import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

import { all } from "../../animation/all";
import { Animate } from "../../animation/animate";
import { process } from "../../animation/process";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { Resources } from "../../resource";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";
import { batteryMinusPop } from "./animation/battery-minus-pop";
import { batteryPlusPop } from "./animation/battery-plus-pop";
import { changeNeedle } from "./animation/change-needle";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import type { BatterySelectorModel } from "./model";
import { MAX_BATTERY } from "./model";
import type { ButtonLabel } from "./model/button-label";
import { canBatteryMinus } from "./model/can-battery-minus";
import { canBatteryPlus } from "./model/can-battery-plus";
import { initialValue } from "./model/initial-value";
import { getNeedleValue } from "./model/needle-value";
import type { BatterySelectorSounds } from "./sounds/battery-selector-sounds";
import { createBatterySelectorSounds } from "./sounds/battery-selector-sounds";
import { BatterySelectorView } from "./view";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 最大バッテリー */
  maxBattery: number,
};

/** バッテリーセレクタ */
export class BatterySelector {
  /** モデル */
  #model: BatterySelectorModel;
  /** ビュー */
  #view: BatterySelectorView;
  /** 効果音 */
  #sounds: BatterySelectorSounds;
  /** バッテリー変更TweenGroup */
  #batteryChangeTween: typeof TWEEN.Group;
  /** -ボタンTweenGroup */
  #batteryMinusTween: typeof TWEEN.Group;
  /** +ボタンTweenGroup */
  #batteryPlusTween: typeof TWEEN.Group;
  /** 決定ボタン押下通知ストリーム */
  #decidePush: StreamSource<Event>;
  /** バッテリープラスボタン押下通知ストリーム */
  #batteryPlusPush: StreamSource<void>;
  /** バッテリーマイナスボタン押下通知ストリーム */
  #batteryMinusPush: StreamSource<void>;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#model = initialValue();
    this.#batteryChangeTween = new TWEEN.Group();
    this.#batteryMinusTween = new TWEEN.Group();
    this.#batteryPlusTween = new TWEEN.Group();
    this.#decidePush = createStreamSource();
    this.#batteryMinusPush = createStreamSource();
    this.#batteryPlusPush = createStreamSource();
    this.#sounds = createBatterySelectorSounds(param.resources);

    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        this.#update(action);
      } else if (action.type === "PreRender") {
        this.#preRender(action);
      }
    });

    this.#view = new BatterySelectorView({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
      onOkPush: (event) => {
        this.#onOKPush(event);
      },
      onPlusPush: () => {
        this.#onBatteryPlusPush();
      },
      onMinusPush: () => {
        this.#onBatteryMinusPush();
      },
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * バッテリーセレクターを開く
   *
   * @param initialValue 初期値
   * @param maxEnable 選択可能な最大値
   * @param label ボタンのラベル
   * @return アニメーション
   */
  open(initialValue: number, maxEnable: number, label: ButtonLabel): Animate {
    this.#model.battery = initialValue;
    this.#model.needle = getNeedleValue(initialValue);
    this.#model.enableMaxBattery = Math.min(maxEnable, MAX_BATTERY);
    this.#model.label = label;
    return open(this.#model);
  }

  /**
   * バッテリー決定アニメーション
   *
   * @return アニメーション
   */
  decide(): Animate {
    this.#sounds.pushButtonSound.play();
    return decide(this.#model);
  }

  /**
   * バッテリーセレクタを閉じる
   *
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#model);
  }

  /**
   * バッテリープラス
   *
   * @return アニメーション
   */
  batteryPlus(): Animate {
    return all(
      this.#batteryPlusPop(),
      this.#batteryChange(this.#model.battery + 1)
    );
  }

  /**
   * バッテリーマイナス
   *
   * @return アニメーション
   */
  batteryMinus(): Animate {
    return all(
      this.#batteryMinusPop(),
      this.#batteryChange(this.#model.battery - 1)
    );
  }

  /** 現在のバッテリー値を取得する */
  getBattery(): number {
    return this.#model.battery;
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * 決定ボタン押下ストリーム
   *
   * @return 通知ストリーム
   */
  decidePushNotifier(): Stream<Event> {
    return this.#decidePush;
  }

  /**
   * バッテリープラスボタン押下ストリーム
   *
   * @return 通知ストリーム
   */
  batteryPlusPushNotifier(): Stream<void> {
    return this.#batteryPlusPush;
  }

  /**
   * バッテリーマイナスボタン押下ストリーム
   *
   * @return 通知ストリーム
   */
  batteryMinusPushNotifier(): Stream<void> {
    return this.#batteryMinusPush;
  }

  /** 状態更新 */
  #update(action: Update): void {
    this.#batteryMinusTween.update(action.time);
    this.#batteryPlusTween.update(action.time);
    this.#batteryChangeTween.update(action.time);
  }

  /** プリレンダー */
  #preRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }

  /**
   * 決定ボタン押下時の処理
   *
   * @param event イベント
   */
  #onOKPush(event: Event): void {
    if (this.#model.disabled) {
      return;
    }
    this.#decidePush.next(event);
  }

  /**
   * バッテリープラスボタン押下時の処理
   */
  #onBatteryPlusPush(): void {
    if (this.#model.disabled || !canBatteryPlus(this.#model)) {
      return;
    }
    this.#batteryPlusPush.next();
  }

  /**
   * バッテリーマイナスボタン押下時の処理
   */
  #onBatteryMinusPush(): void {
    if (this.#model.disabled || !canBatteryMinus(this.#model)) {
      return;
    }
    this.#batteryMinusPush.next();
  }

  /**
   * バッテリーマイナスボタン ポップ
   *
   * @return アニメーション
   */
  #batteryMinusPop(): Animate {
    this.#batteryMinusTween.update();
    this.#batteryMinusTween.removeAll();
    return batteryMinusPop(this.#model, this.#sounds, this.#batteryMinusTween);
  }

  /**
   * バッテリープラスボタン ポップ
   *
   * @return アニメーション
   */
  #batteryPlusPop(): Animate {
    this.#batteryPlusTween.update();
    this.#batteryPlusTween.removeAll();
    return batteryPlusPop(this.#model, this.#sounds, this.#batteryPlusTween);
  }

  /**
   * バッテリー値を変更するヘルパー関数
   *
   * @param battery 変更するバッテリー値
   * @return アニメーション
   */
  #batteryChange(battery: number): Animate {
    this.#batteryChangeTween.update();
    this.#batteryChangeTween.removeAll();
    const needle = getNeedleValue(battery);
    return all(
      process(() => {
        this.#model.battery = battery;
      }),
      changeNeedle(this.#model, this.#batteryChangeTween, needle)
    );
  }
}
