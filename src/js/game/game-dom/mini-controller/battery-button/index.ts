import { Observable, Unsubscribable } from "rxjs";

import { BatteryButtonConfig } from "./config";
import { bindEventListeners } from "./procedure/bind-event-lisnters";
import { engage } from "./procedure/engage";
import {
  BatteryButtonProps,
  BatteryPush,
  createBatteryButtonProps,
} from "./props";

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
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLButtonElement {
    return this.#props.root;
  }

  /**
   * バッテリー押下通知
   * @returns 通知ストリーム
   */
  pushNotifier(): Observable<BatteryPush> {
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
