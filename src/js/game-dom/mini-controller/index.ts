import { Observable, Unsubscribable } from "rxjs";

import { bindEventListeners } from "./listeners";
import { createMiniControllerProps, MiniControllerProps } from "./props";
import { ButtonConfig } from "./button-config";
import { engageButtonConfig } from "./engage-button-config";

/** ミニコントローラ */
export class MiniController {
  /** プロパティ */
  #props: MiniControllerProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param config ボタン設定
   */
  constructor(config: ButtonConfig) {
    this.#props = createMiniControllerProps();
    engageButtonConfig(this.#props, config);
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
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * バッテリーボタン押下通知
   * @return 通知ストリーム、numberはバッテリー値
   */
  batteryPushNotigier(): Observable<number> {
    return this.#props.batteryPush;
  }

  /**
   * バーストボタン押下通知
   * @return 通知ストリーム
   */
  burstPushNotifier(): Observable<void> {
    return this.#props.burstPush;
  }

  /**
   * パイロットボタン押下通知
   * @return 通知ストリーム
   */
  pilotPushNotifier(): Observable<void> {
    return this.#props.pilotPush;
  }
}
