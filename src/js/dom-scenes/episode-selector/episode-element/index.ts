import { Observable } from "rxjs";

import type { EpisodeID, EpisodeNumber } from "../../../game/episodes/episode";
import type { Resources } from "../../../resource";
import { Episode } from "./episode";
import { selected } from "./procedure/selected";
import { createEpisodeElementProps, EpisodeElementProps } from "./props";

/** エピソードHTML要素 */
export class EpisodeElement {
  /** エピソードID */
  readonly id: EpisodeID;
  /** エピソード番号 */
  readonly number: EpisodeNumber;
  /** プロパティ */
  #props: EpisodeElementProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param episode エピソード情報
   */
  constructor(resources: Resources, episode: Episode) {
    this.id = episode.id;
    this.number = episode.number;
    this.#props = createEpisodeElementProps(resources, episode);
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 選択通知
   * @return 通知ストリーム
   */
  notifySelection(): Observable<void> {
    return this.#props.select;
  }

  /**
   * ステージ選択アニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  async selected(): Promise<void> {
    await selected(this.#props);
  }
}
