import { Observable, Unsubscribable } from "rxjs";
import { BatteryButtonProps, createBatteryButtonProps } from "./props";
import { bindEventListeners } from "./procedure/bind-event-lisnters";
import { visibleBattery } from "./procedure/visible-battery";
import { visibleBatteryAsFirst } from "./procedure/visible-battery-as-first";
import { visibleBatteryAsLast } from "./procedure/visible-battery-as-last";
import { invisibleBattery } from "./procedure/invisible-battery";
import { enabledBatttery } from "./procedure/enabled-batttery";
import { disabledBattery } from "./procedure/disabled-battery";

/** バッテリーボタン */
export class BatteryButton {
  /** プロパティ */
  #props: BatteryButtonProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param battery バッテリー値
   */
  constructor(battery: number) {
    this.#props = createBatteryButtonProps(battery);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * バッテリー押下通知、numberはバッテリー値がセットされる
   * @return 通知ストリーム
   */
  batteryPushNotifier(): Observable<number> {
    return this.#props.batteryPush;
  }

  /**
   * バッテリーボタンを表示する
   */
  visibleBattery(): void {
    visibleBattery(this.#props);
  }

  /**
   * バッテリーボタンを先頭要素として表示する
   */
  visibleBatteryAsFirst(): void {
    visibleBatteryAsFirst(this.#props);
  }

  /**
   * バッテリーボタンを末尾要素として表示する
   */
  visibleBatteryAsLast(): void {
    visibleBatteryAsLast(this.#props);
  }

  /**
   * バッテリーボタンを非表示にする
   */
  invisibleBattery(): void {
    invisibleBattery(this.#props);
  }

  /**
   * バッテリーボタンを操作可能にする
   */
  enabledBatttery(): void {
    enabledBatttery(this.#props);
  }

  /**
   * バッテリーボタンを操作不可能にする
   */
  disabledBattery(): void {
    disabledBattery(this.#props);
  }
}