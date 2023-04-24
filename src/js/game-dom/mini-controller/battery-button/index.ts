import { Observable, Unsubscribable } from "rxjs";
import { BatteryButtonProps, createBatteryButtonProps } from "./props";
import { bindEventListeners } from "./procedure/bind-event-lisnters";
import { visible } from "./procedure/visible";
import { visibleAsFirst } from "./procedure/visible-as-first";
import { visibleAsLast } from "./procedure/visible-as-last";
import { invisible } from "./procedure/invisible";
import { enabled } from "./procedure/enabled";
import { disabled } from "./procedure/disabled";

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
  pushNotifier(): Observable<number> {
    return this.#props.batteryPush;
  }

  /**
   * バッテリーボタンを表示する
   */
  visible(): void {
    visible(this.#props);
  }

  /**
   * バッテリーボタンを先頭要素として表示する
   */
  visibleAsFirst(): void {
    visibleAsFirst(this.#props);
  }

  /**
   * バッテリーボタンを末尾要素として表示する
   */
  visibleAsLast(): void {
    visibleAsLast(this.#props);
  }

  /**
   * バッテリーボタンを非表示にする
   */
  invisible(): void {
    invisible(this.#props);
  }

  /**
   * バッテリーボタンを操作可能にする
   */
  enabled(): void {
    enabled(this.#props);
  }

  /**
   * バッテリーボタンを操作不可能にする
   */
  disabled(): void {
    disabled(this.#props);
  }
}