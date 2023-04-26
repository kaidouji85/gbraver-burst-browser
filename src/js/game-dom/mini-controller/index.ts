import { Observable } from "rxjs";

import { ButtonConfig } from "./button-config";
import { engageButtonConfig } from "./procedure/engage-button-config";
import { createMiniControllerProps, MiniControllerProps } from "./props";

/** ミニコントローラ */
export class MiniController {
  /** プロパティ */
  #props: MiniControllerProps;

  /**
   * コンストラクタ
   * @param config ボタン設定
   */
  constructor(config: ButtonConfig) {
    this.#props = createMiniControllerProps();
    engageButtonConfig(this.#props, config);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.batteryButtons.forEach((batteryButton) => {
      batteryButton.destructor();
    });
    this.#props.burstButton.destructor();
    this.#props.pilotButton.destructor();
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
    return this.#props.burstButton.pushNotifier();
  }

  /**
   * パイロットボタン押下通知
   * @return 通知ストリーム
   */
  pilotPushNotifier(): Observable<void> {
    return this.#props.pilotButton.pushNotifier();
  }
}
