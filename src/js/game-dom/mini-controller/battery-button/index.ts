import { Observable, Unsubscribable } from "rxjs";
import { BatteryButtonProps, createBatteryButtonProps } from "./props";
import { bindEventListeners } from "./procedure/bind-event-lisnters";
import { BatteryButtonConfig } from "./config";
import { engage } from "./procedure/engage";

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
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLButtonElement {
    return this.#props.root;
  }

  /**
   * バッテリー押下通知、numberはバッテリー値がセットされる
   * @return 通知ストリーム
   */
  pushNotifier(): Observable<number> {
    return this.#props.batteryPush;
  }

  /**
   * 設定を反映させる
   * @param config 設定
   */
  engage(config: BatteryButtonConfig): void {
    engage(this.#props, config);
  }
}