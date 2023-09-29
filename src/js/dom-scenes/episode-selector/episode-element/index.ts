import { Observable } from "rxjs";

import type { EpisodeID } from "../../../game/episodes/episode";
import type { Resources } from "../../../resource";
import { Episode } from "./episode";
import { selected } from "./procedure/selected";
import {
  createEpisodeElementProps,
  EpisodeElementProps,
} from "./props";

/** エピソードHTML要素 */
export class EpisodeElement {
  /** ID */
  readonly id: EpisodeID;
  /** レベル */
  readonly level: number;
  /** プロパティ */
  #props: EpisodeElementProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param episode エピソード情報
   * @param level ステージレベル
   */
  constructor(resources: Resources, episode: Episode, level: number) {
    this.id = episode.id;
    this.level = level;
    this.#props = createEpisodeElementProps(resources, episode, level);
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * ステージ選択通知
   * @return 通知ストリーム
   */
  notifyStageSelection(): Observable<void> {
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
