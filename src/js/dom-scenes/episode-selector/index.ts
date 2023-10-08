import { Observable, Unsubscribable } from "rxjs";

import type { Resources } from "../../resource";
import type { DOMScene } from "../dom-scene";
import { Episode } from "./episode-element/episode";
import { EpisodeSelect } from "./episode-element/episode-select";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { createEpisodeSelectorProps, EpisodeSelectorProps } from "./props";
import {initialize} from "./procedure/initialize";

/** エピソードセレクト画面 */
export class EpisodeSelector implements DOMScene {
  /** プロパティ */
  #props: EpisodeSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param episodes エピソード情報
   */
  constructor(resources: Resources, episodes: Episode[]) {
    this.#props = createEpisodeSelectorProps(resources, episodes);
    this.#unsubscribers = bindEventListeners(this.#props);
    initialize(this.#props);
  }

  /** @override */
  destructor(): void {
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
