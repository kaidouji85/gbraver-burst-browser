import { Observable } from "rxjs";

import { Resources } from "../../resource";
import { ButtonConfig } from "./button-config";
import { decided } from "./procedure/decided";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { createMiniControllerProps, MiniControllerProps } from "./props";

/** ミニコントローラ */
export class MiniController {
  /** プロパティ */
  #props: MiniControllerProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#props = createMiniControllerProps(resources);
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
   * コマンド決定アニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  async decided(): Promise<void> {
    await decided(this.#props);
  }

  /**
   * バッテリーボタン押下通知
   * @return 通知ストリーム、numberはバッテリー値
   */
  batteryPushNotifier(): Observable<number> {
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
