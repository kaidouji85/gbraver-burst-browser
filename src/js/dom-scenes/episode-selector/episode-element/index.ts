import { Observable } from "rxjs";

import type { EpisodeID } from "../../../game/episodes/episode";
import type { Resources } from "../../../resource";
import { Episode } from "./episode";
import { check } from "./procedure/check";
import { uncheck } from "./procedure/uncheck";
import { createEpisodeElementProps, EpisodeElementProps } from "./props";

/** エピソードHTML要素 */
export class EpisodeElement {
  /** エピソードID */
  readonly id: EpisodeID;
  /** イメージカットのパス */
  readonly imageCutPath: string;
  /** タイトル */
  readonly title: string;
  /** 導入 */
  readonly introduction: string;
  /** プロパティ */
  #props: EpisodeElementProps;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param episode エピソード情報
   */
  constructor(resources: Resources, episode: Episode) {
    this.id = episode.id;
    this.imageCutPath = episode.imageCutPathId;
    this.title = episode.title;
    this.introduction = episode.introduction;
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
  selectionNotifier(): Observable<void> {
    return this.#props.select;
  }

  /**
   * チェックする
   */
  check(): void {
    check(this.#props);
  }

  /**
   * チェックを外す
   */
  uncheck(): void {
    uncheck(this.#props);
  }
}
