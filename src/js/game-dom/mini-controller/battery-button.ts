import { Observable, Subject, Unsubscribable } from "rxjs";
import { BATTERY, BATTERY_FIRST, BATTERY_INVISIBLE, BATTERY_LAST } from "./dom/class-name";

/** バッテリーボタン */
export class BatteryButton {
  /** ルート要素 */
  #root: HTMLButtonElement;
  /** バッテリー値 */
  #battery: number;
  /** バッテリー押下ストリーム */
  #batteryPush: Subject<number>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param battery バッテリー値
   */
  constructor(battery: number) {
    this.#root = document.createElement("button");
    this.#root.className = BATTERY;
    this.#root.accessKey = `${battery}`;
    this.#battery = battery;
    this.#batteryPush = new Subject();
    this.#unsubscribers = [];
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
    return this.#batteryPush;
  }

  /**
   * バッテリーボタンを表示する
   */
  visibleBattery(): void {
    this.#root.className = BATTERY;
  }

  /**
   * バッテリーボタンを先頭要素として表示する
   */
  visibleBatteryAsFirst(): void {
    this.#root.className = BATTERY_FIRST;
  }

  /**
   * バッテリーボタンを末尾要素として表示する
   */
  visibleBatteryAsLast(): void {
    this.#root.className = BATTERY_LAST;
  }

  /**
   * バッテリーボタンを非表示にする
   */
  invisibleBattery(): void {
    this.#root.className = BATTERY_INVISIBLE;
  }

  /**
   * バッテリーボタンを操作可能にする
   */
  enabledBatttery(): void {
    this.#root.disabled = false;
    this.#root.innerText = `${this.#battery}`;
  }

  /**
   * バッテリーボタンを操作不可能にする
   */
  disabledBattery(): void {
    this.#root.disabled = true;
    this.#root.innerText = "";
  }
}