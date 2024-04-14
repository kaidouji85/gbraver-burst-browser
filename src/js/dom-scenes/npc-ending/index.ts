import { Observable, Unsubscribable } from "rxjs";

import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createNPCEndingProps,
  GenerateNPCEndingPropsParams,
} from "./procedures/create-npc-ending-props";
import { playBGM } from "./procedures/play-bgm";
import { waitUntilLoaded } from "./procedures/wait-until-loaded";
import { NPCEndingProps } from "./props";

/** コンストラクタのパラメータ */
export type ConstructNPCEndingParams = GenerateNPCEndingPropsParams;

/** NPCルート エンディング画面 */
export class NPCEnding implements DOMScene {
  /** プロパティ */
  #props: NPCEndingProps;
  /** アンサブスクライバ */
  #unSubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: ConstructNPCEndingParams) {
    this.#props = createNPCEndingProps(params);
    this.#unSubscriber = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unSubscriber.forEach((v) => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * BGMの再生開始
   * @return BGM再生が完了したら発火するPromise
   */
  async playBGM(): Promise<void> {
    await playBGM(this.#props);
  }

  /**
   * NPCエンディング終了を通知する
   * @return 通知ストリーム
   */
  notifyFinish(): Observable<void> {
    return this.#props.endNPCEnding;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await waitUntilLoaded(this.#props);
  }
}
