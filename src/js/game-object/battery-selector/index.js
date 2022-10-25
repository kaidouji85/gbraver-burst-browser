// @flow

import TWEEN from "@tweenjs/tween.js";
import { Howl } from "howler";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Update } from "../../game-loop/update";
import type { Resources } from "../../resource";
import { SOUND_IDS } from "../../resource/sound";
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
import { BatterySelectorView } from "./view";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 最大バッテリー */
  maxBattery: number,
  /**
   * @deprecated
   * バッテリー変更時に呼ばれるのコールバック関数
   * @param battery 変更後のバッテリー値
   */
  onBatteryChange: (battery: number) => void,
  /**
   * @deprecated
   * 決定ボタンが押された時に呼ばれるコールバック関数
   * @param event イベント情報
   */
  onOkButtonPush: (event: Event) => void,
};

/** バッテリーセレクタ */
export class BatterySelector {
  /** モデル */
  #model: BatterySelectorModel;
  /** ビュー */
  #view: BatterySelectorView;
  /** 効果音ボタン押下 */
  #pushButtonSound: typeof Howl;
  /** 効果音値変更 */
  #batteryChangeSound: typeof Howl;
  /** バッテリー変更TweenGroup */
  #batteryChangeTween: typeof TWEEN.Group;
  /** -ボタンTweenGroup */
  #batteryMinusTween: typeof TWEEN.Group;
  /** +ボタンTweenGroup */
  #batteryPlusTween: typeof TWEEN.Group;
  /** 決定ボタン押下通知ストリーム */
  #okButtonPush: StreamSource<Event>;
  /** +ボタン押下通知ストリーム */
  #plusButtonPush: StreamSource<void>;
  /** -ボタン押下通知ストリーム */
  #minusButtonPush: StreamSource<void>;
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
    this.#okButtonPush = createStreamSource();
    this.#minusButtonPush = createStreamSource();
    this.#plusButtonPush = createStreamSource();

    const pushButtonResource = param.resources.sounds.find(
      (v) => v.id === SOUND_IDS.PUSH_BUTTON
    );
    this.#pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    const batteryChangeResource = param.resources.sounds.find(
      (v) => v.id === SOUND_IDS.CHANGE_VALUE
    );
    this.#batteryChangeSound = batteryChangeResource
      ? batteryChangeResource.sound
      : new Howl();

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
        if (this.#model.disabled) {
          return;
        }

        param.onOkButtonPush(event);
      },
      onPlusPush: () => {
        if (this.#model.disabled || !canBatteryPlus(this.#model)) {
          return;
        }

        this.#batteryPlusPop();
        this.#batteryChange(this.#model.battery + 1);
        param.onBatteryChange(this.#model.battery);
      },
      onMinusPush: () => {
        if (this.#model.disabled || !canBatteryMinus(this.#model)) {
          return;
        }

        this.#batteryMinusPop();
        this.#batteryChange(this.#model.battery - 1);
        param.onBatteryChange(this.#model.battery);
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
    this.#pushButtonSound.play();
    return decide(this.#model);
  }

  /** バッテリーセレクタを閉じる */
  close(): Animate {
    return close(this.#model);
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
  okButtonPushNotifier(): Stream<Event> {
    return this.#okButtonPush;
  }

  /**
   * +ボタン押下ストリーム
   *
   * @return 通知ストリーム
   */
  plusButtonPushNotifier(): Stream<void> {
    return this.#plusButtonPush;
  }

  /**
   * -ボタン押下ストリーム
   *
   * @return 通知ストリーム
   */
  minusButtonPushNotifier(): Stream<void> {
    return this.#minusButtonPush;
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
   * バッテリーマイナスボタン ポップ
   */
  #batteryMinusPop(): void {
    this.#batteryMinusTween.update();
    this.#batteryMinusTween.removeAll();

    this.#batteryChangeSound.play();
    batteryMinusPop(this.#model, this.#batteryMinusTween).play();
  }

  /**
   * バッテリープラスボタン ポップ
   */
  #batteryPlusPop(): void {
    this.#batteryPlusTween.update();
    this.#batteryPlusTween.removeAll();

    this.#batteryChangeSound.play();
    batteryPlusPop(this.#model, this.#batteryPlusTween).play();
  }

  /**
   * バッテリー値を変更するヘルパー関数
   *
   * @param battery 変更するバッテリー値
   */
  #batteryChange(battery: number): void {
    this.#batteryChangeTween.update();
    this.#batteryChangeTween.removeAll();

    this.#model.battery = battery;
    const needle = getNeedleValue(battery);
    changeNeedle(this.#model, this.#batteryChangeTween, needle).play();
  }
}
