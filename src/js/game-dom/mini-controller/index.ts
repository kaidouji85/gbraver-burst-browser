import { Observable } from "rxjs";

import { ButtonConfig } from "./button-config";
import { createMiniControllerProps, MiniControllerProps } from "./props";
import { show } from "./procedure/show";
import { hidden } from "./procedure/hidden";

/** ミニコントローラ */
export class MiniController {
  /** プロパティ */
  #props: MiniControllerProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createMiniControllerProps();
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
   * ミニコントローラーを表示する
   * @param config ボタン設定
   * @return 処理が完了したら発火するPromise
   */
  async show(config: Readonly<ButtonConfig>): Promise<void> {
    await show(this.#props, config);
  }

  /**
   * ミニコントローラーを非表示にする
   * @return 処理が完了したら発火するPromise
   */
  async hidden(): Promise<void> {
    await hidden(this.#props);
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
