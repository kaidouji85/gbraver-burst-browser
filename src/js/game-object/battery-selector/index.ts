import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { SignalContainer } from "../../abort-controller/signal-container";
import { Animate } from "../../animation/animate";
import { onStart } from "../../animation/on-start";
import { close } from "./animation/close";
import { open } from "./animation/open";
import { popBatteryButton } from "./animation/pop-battery-button";
import { BatterySelectorOpenParam } from "./battery-selector-open-param";
import { attention } from "./procedure/attention";
import { batteryMinus } from "./procedure/battery-minus";
import { batteryPlus } from "./procedure/battery-plus";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { notifyBatteryMinus } from "./procedure/notify-battery-minus";
import { notifyBatteryPlus } from "./procedure/notify-battery-plus";
import { notifyDecision } from "./procedure/notify-decision";
import { notifyNumberPushed } from "./procedure/notify-number-pushed";
import {
  pushBatteryAdjustButtonsSilently,
  SilentlyBatteryAdjustOptions,
} from "./procedure/push-battery-adjust-buttons-silently";
import { stopAttention } from "./procedure/stop-attention";
import { toBattery } from "./procedure/to-battery";
import { BatterySelectorProps } from "./props/battery-selector-props";
import {
  createBatterySelectorProps,
  PropsCreatorOptions,
} from "./props/create-battery-selector-props";

/** コンストラクタのパラメータ */
type BatterySelectorParam = PropsCreatorOptions;

/** バッテリーセレクタ */
export class BatterySelector {
  /** プロパティ */
  #props: BatterySelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: BatterySelectorParam) {
    this.#props = createBatterySelectorProps(param);
    this.#unsubscribers = bindEventListeners(
      this.#props,
      param.gameObjectAction,
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * バッテリーセレクターを開く
   * @param param パラメータ
   * @returns アニメーション
   */
  open(param: BatterySelectorOpenParam): Animate {
    return onStart(() => {
      stopAttention(this.#props);
    }).chain(open(this.#props, param));
  }

  /**
   * バッテリー決定アニメーション
   * @returns アニメーション
   */
  decide(): Animate {
    return popBatteryButton(this.#props);
  }

  /**
   * バッテリーセレクタを閉じる
   * @returns アニメーション
   */
  close(): Animate {
    return close(this.#props);
  }

  /**
   * バッテリープラス
   * メモリ最大値の場合は何もしない
   * @param options オプション
   * @returns 処理が完了したら発火するPromise
   */
  async batteryPlus(options?: Partial<SignalContainer>): Promise<void> {
    await batteryPlus(this.#props, options);
  }

  /**
   * バッテリーマイナス
   * メモリ最小値の場合は何もしない
   * @param options オプション
   * @returns 処理が完了したら発火するPromise
   */
  async batteryMinus(options?: Partial<SignalContainer>): Promise<void> {
    await batteryMinus(this.#props, options);
  }

  /**
   * 指定されたバッテリー値に変更する
   * @param value バッテリー値
   * @param options オプション
   * @returns 処理が完了したら発火するPromise
   */
  async toBattery(
    value: number,
    options?: Partial<SignalContainer>,
  ): Promise<void> {
    await toBattery(this.#props, value, options);
  }

  /**
   * バッテリー調整ボタンを無音で押す
   * @param battery バッテリー設定値
   * @param options オプション
   * @returns 処理が完了したら発火するPromise
   */
  async pushBatteryAdjustButtonsSilently(
    battery: number,
    options?: SilentlyBatteryAdjustOptions,
  ): Promise<void> {
    await pushBatteryAdjustButtonsSilently(this.#props, battery, options);
  }

  /**
   * 注目アニメーションを実行する
   */
  attention(): void {
    attention(this.#props);
  }

  /**
   * 現在のバッテリー値を取得する
   * @returns 取得結果
   */
  getBattery(): number {
    return this.#props.model.battery;
  }

  /**
   * 操作不可能フラグを設定する
   * @param isDisabled trueで操作不可能となる
   */
  disabled(isDisabled: boolean): void {
    this.#props.disabled = isDisabled;
  }

  /**
   * 操作不可能であるか否かを判定する、trueで操作不可能である
   * @returns 判定結果
   */
  isDisabled(): boolean {
    return this.#props.disabled;
  }

  /**
   * シーンに追加するthree.jsオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * 決定ボタン押下ストリーム
   * @returns 通知ストリーム
   */
  notifyDecision(): Observable<Event> {
    return notifyDecision(this.#props);
  }

  /**
   * バッテリープラスボタン押下ストリーム
   * @returns 通知ストリーム
   */
  notifyBatteryPlus(): Observable<unknown> {
    return notifyBatteryPlus(this.#props);
  }

  /**
   * バッテリーマイナスボタン押下ストリーム
   * @returns 通知ストリーム
   */
  notifyBatteryMinus(): Observable<unknown> {
    return notifyBatteryMinus(this.#props);
  }

  /**
   * 数字が押されたことを通知する
   * @returns 通知のObservable
   */
  notifyNumberPushed(): Observable<number> {
    return notifyNumberPushed(this.#props);
  }
}
