import { Observable } from "rxjs";

import { Animate } from "../../animation/animate";
import { ButtonConfig } from "./button-config";
import { decided } from "./procedure/decided";
import { engageButtonConfig } from "./procedure/engage-button-config";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import {
  createMiniControllerProps,
  MiniControllerProps,
  PropsCreatorParams,
} from "./props";

/** コンストラクタのパラメータ */
export type MiniControllerParams = PropsCreatorParams;

/**
 * ミニコントローラ
 * 本コンポネントは非表示状態（display: none）でもaccesskeyでボタンが反応する
 */
export class MiniController {
  /** プロパティ */
  #props: MiniControllerProps;

  /**
   * コンストラクタ
   * @param params コンストラクタのパラメータ
   */
  constructor(params: MiniControllerParams) {
    this.#props = createMiniControllerProps(params);
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
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ミニコントローラーを表示する
   * @returns アニメーション
   */
  show(): Animate {
    return show(this.#props);
  }

  /**
   * ボタン設定をコンポネントに反映する
   * @param config ボタン設定
   */
  engage(config: Readonly<ButtonConfig>): void {
    engageButtonConfig(this.#props, config);
  }

  /**
   * ミニコントローラーを非表示にする
   * @returns アニメーション
   */
  hidden(): Animate {
    return hidden(this.#props);
  }

  /**
   * コマンド決定アニメーション
   * @returns アニメーション
   */
  decided(): Animate {
    return decided(this.#props);
  }

  /**
   * バッテリーボタン押下通知
   * @returns 通知ストリーム、numberはバッテリー値
   */
  batteryPushNotifier(): Observable<number> {
    return this.#props.batteryPush;
  }

  /**
   * バーストボタン押下通知
   * @returns 通知ストリーム
   */
  burstPushNotifier(): Observable<void> {
    return this.#props.burstButton.pushNotifier();
  }

  /**
   * パイロットボタン押下通知
   * @returns 通知ストリーム
   */
  pilotPushNotifier(): Observable<void> {
    return this.#props.pilotButton.pushNotifier();
  }
}
