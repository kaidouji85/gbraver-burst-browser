// @flow
import {inputDOMStream, pushDOMStream} from "../../../dom/event-stream";
import type {Resources} from "../../../resource";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GbraverBurstBrowserConfig} from "../../config/browser-config";
import type {DOMScene} from "../dom-scene";
import {onAcceptConfigChange} from "./listeners/on-accept-config-change";
import {onBGMVolumeChange} from "./listeners/on-bgm-volume-change";
import {onConfigChangeButtonPush} from "./listeners/on-config-change-button-push";
import {onDialogClose} from "./listeners/on-dialog-close";
import {onDiscardConfigChange} from "./listeners/on-discard-config-change";
import {onPrevButtonPush} from "./listeners/on-prev-button-push";
import {onSEVolumeChange} from "./listeners/on-se-volume-change";
import type {ConfigProps} from "./props";
import {createConfigProps} from "./props";

/** 設定画面 */
export class Config implements DOMScene {
  #props: ConfigProps;
  #unsubscriber: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   */
  constructor(resources: Resources, config: GbraverBurstBrowserConfig) {
    this.#props = createConfigProps(resources, config);
    this.#unsubscriber = [
      inputDOMStream(this.#props.bgmVolumeSelector).subscribe(action => {
        onBGMVolumeChange(this.#props, action);
      }),
      inputDOMStream(this.#props.seVolumeSelector).subscribe(action => {
        onSEVolumeChange(this.#props, action);
      }),
      pushDOMStream(this.#props.prevButton).subscribe(action => {
        onPrevButtonPush(this.#props, action);
      }),
      pushDOMStream(this.#props.configChangeButton).subscribe(action => {
        onConfigChangeButtonPush(this.#props, action);
      }),
      this.#props.dialog.closeNotifier().subscribe(() => {
        onDialogClose(this.#props);
      }),
      this.#props.dialog.discardNotifier().subscribe(() => {
        onDiscardConfigChange(this.#props);
      }),
      this.#props.dialog.acceptNotifier().subscribe(() => {
        onAcceptConfigChange(this.#props);
      }),
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.forEach(v => {
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
  prevNotifier(): Stream<void> {
    return this.#props.prev;
  }

  /**
   * 設定変更通知
   *
   * @return 通知ストリーム
   */
  configChangeNotifier(): Stream<GbraverBurstBrowserConfig> {
    return this.#props.configChange;
  }
}