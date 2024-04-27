import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import { BatterySelectorOpenParam } from "./battery-selector-open-param";
import { batteryMinus } from "./procedure/battery-minus";
import { batteryPlus } from "./procedure/battery-plus";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { toBatterySilently } from "./procedure/to-battery-silently";
import { BatterySelectorProps } from "./props/battery-selector-props";
import {
  createBatterySelectorProps,
  PropsCreatorParams,
} from "./props/create-battery-selector-props";

/** コンストラクタのパラメータ */
type BatterySelectorParam = PropsCreatorParams;

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
    return open(this.#props, param);
  }

  /**
   * バッテリー決定アニメーション
   * @returns アニメーション
   */
  decide(): Animate {
    return decide(this.#props);
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
   * @returns 処理が完了したら発火するPromise
   */
  async batteryPlus(): Promise<void> {
    await batteryPlus(this.#props);
  }

  /**
   * バッテリーマイナス
   * メモリ最小値の場合は何もしない
   * @returns 処理が完了したら発火するPromise
   */
  async batteryMinus(): Promise<void> {
    await batteryMinus(this.#props);
  }

  /**
   * 無音でバッテリー値を設定する
   * @param battery バッテリー設定値
   * @param duration ボタンを押す間隔（ミリ秒）
   * @returns 処理が完了したら発火するPromise
   */
  async toBatterySilently(battery: number, duration = 200): Promise<void> {
    await toBatterySilently(this.#props, battery, duration);
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
    this.#props.model.disabled = isDisabled;
  }

  /**
   * 操作不可能であるか否かを判定する、trueで操作不可能である
   * @returns 判定結果
   */
  isDisabled(): boolean {
    return this.#props.model.disabled;
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
    return this.#props.decidePush;
  }

  /**
   * バッテリープラスボタン押下ストリーム
   * @returns 通知ストリーム
   */
  notifyBatteryPlus(): Observable<void> {
    return this.#props.batteryPlusPush;
  }

  /**
   * バッテリーマイナスボタン押下ストリーム
   * @returns 通知ストリーム
   */
  notifyBatteryMinus(): Observable<void> {
    return this.#props.batteryMinusPush;
  }
}
