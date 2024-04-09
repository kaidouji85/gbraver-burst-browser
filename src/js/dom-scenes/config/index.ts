import { Observable, Unsubscribable } from "rxjs";

import type { GBraverBurstBrowserConfig } from "../../game/config/browser-config";
import type { Resources } from "../../resource";
import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./listeners";
import type { ConfigProps } from "./props";
import { createConfigProps } from "./props";
import {BGMManager} from "../../bgm/bgm-manager";

/** 設定画面 */
export class Config implements DOMScene {
  #props: ConfigProps;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   * @param bgm BGM管理オブジェクト
   */
  constructor(resources: Resources, config: GBraverBurstBrowserConfig, bgm: BGMManager ) {
    this.#props = createConfigProps(resources, config, bgm);
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
  notifyConfigChanges(): Observable<GBraverBurstBrowserConfig> {
    return this.#props.configChange;
  }
}
