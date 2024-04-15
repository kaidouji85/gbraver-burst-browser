import { Observable, Unsubscribable } from "rxjs";

import type { GBraverBurstBrowserConfig } from "../../game/config/browser-config";
import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./listeners";
import type { ConfigProps, PropsCreatorParams } from "./props";
import { createConfigProps } from "./props";

/** コンストラクタのパラメータ */
type ConfigParams = PropsCreatorParams;

/** 設定画面 */
export class Config implements DOMScene {
  #props: ConfigProps;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   * @param bgm BGM管理オブジェクト
   * @param se SE再生オブジェクト
   */
  constructor(params: ConfigParams) {
    this.#props = createConfigProps(params);
    this.#unsubscriber = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.forEach((v) => {
      v.unsubscribe();
    });
    this.#props.dialog.destructor();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 戻る通知
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }

  /**
   * 設定変更通知
   * @return 通知ストリーム
   */
  notifyConfigChanges(): Observable<GBraverBurstBrowserConfig> {
    return this.#props.configChange;
  }
}
