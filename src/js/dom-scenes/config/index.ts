import { Observable, Unsubscribable } from "rxjs";

import type { GbraverBurstBrowserConfig } from "../../game/config/browser-config";
import type { Resources } from "../../resource";
import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./listeners";
import type { ConfigProps } from "./props";
import { createConfigProps } from "./props";

/** 設定画面 */
export class Config implements DOMScene {
  #props: ConfigProps;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(resources: Resources, config: GbraverBurstBrowserConfig) {
    this.#props = createConfigProps(resources, config);
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
   *
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }

  /**
   * 設定変更通知
   *
   * @return 通知ストリーム
   */
  notifyConfigChanges(): Observable<GbraverBurstBrowserConfig> {
    return this.#props.configChange;
  }
}
