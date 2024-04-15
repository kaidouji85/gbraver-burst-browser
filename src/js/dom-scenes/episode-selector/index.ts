import { Observable, Unsubscribable } from "rxjs";

import { EpisodeID } from "../../game/episodes/episode";
import { DOMScene } from "../dom-scene";
import { EpisodeSelect } from "./episode-element/episode-select";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  createEpisodeSelectorProps,
  PropsCreatorParams,
} from "./procedure/create-episode-selector-props";
import { initialize } from "./procedure/initialize";
import { EpisodeSelectorProps } from "./props";

/** コンストラクタのパラメータ */
export type EpisodeSelectorParams = PropsCreatorParams & {
  initialSelectedEpisodeID?: EpisodeID;
};

/** エピソードセレクト画面 */
export class EpisodeSelector implements DOMScene {
  /** プロパティ */
  #props: EpisodeSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: EpisodeSelectorParams) {
    const { initialSelectedEpisodeID } = params;
    this.#props = createEpisodeSelectorProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
    initialize(this.#props, initialSelectedEpisodeID);
  }

  /** @override */
  destructor(): void {
    this.#props.episodeElements.forEach((episodeElement) => {
      episodeElement.destructor();
    });
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await this.#props.isImageCutsLoaded;
  }

  /**
   * 戻るボタン押下通知
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }

  /**
   * 選択通知
   * @return 通知ストリーム
   */
  notifySelection(): Observable<EpisodeSelect> {
    return this.#props.episodeSelect;
  }
}
