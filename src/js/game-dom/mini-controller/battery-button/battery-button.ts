import { Observable, Unsubscribable } from "rxjs";
import { BATTERY, BATTERY_FIRST, BATTERY_INVISIBLE, BATTERY_LAST } from "../dom/class-name";
import { BatteryButtonProps, createBatteryButtonProps } from "./props";
import { bindEventListeners } from "./procedure/bind-event-lisnters";

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
    this.#props.root.className = BATTERY;
  }

  /**
   * バッテリーボタンを先頭要素として表示する
   */
  visibleBatteryAsFirst(): void {
    this.#props.root.className = BATTERY_FIRST;
  }

  /**
   * バッテリーボタンを末尾要素として表示する
   */
  visibleBatteryAsLast(): void {
    this.#props.root.className = BATTERY_LAST;
  }

  /**
   * バッテリーボタンを非表示にする
   */
  invisibleBattery(): void {
    this.#props.root.className = BATTERY_INVISIBLE;
  }

  /**
   * バッテリーボタンを操作可能にする
   */
  enabledBatttery(): void {
    this.#props.root.disabled = false;
    this.#props.root.innerText = `${this.#props.battery}`;
  }

  /**
   * バッテリーボタンを操作不可能にする
   */
  disabledBattery(): void {
    this.#props.root.disabled = true;
    this.#props.root.innerText = "";
  }
}