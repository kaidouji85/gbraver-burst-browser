import { Observable } from "rxjs";

import type { EpisodeID } from "../../../game/episodes/episode";
import type { Resources } from "../../../resource";
import { Episode } from "../episode";
import { check } from "./procedure/check";
import { isChecked } from "./procedure/is-checked";
import { uncheck } from "./procedure/uncheck";
import { createEpisodeElementProps, EpisodeElementProps } from "./props";

/** エピソードHTML要素 */
export class EpisodeElement {
  /** @deprecated エピソードID */
  readonly id: EpisodeID;
  /** @deprecated イメージカットのパス */
  readonly imageCutPath: string;
  /** @deprecated タイトル */
  readonly title: string;
  /** @deprecated 導入 */
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
    this.imageCutPath =
      resources.paths.find((v) => v.id === episode.imageCutPathId)?.path ?? "";
    this.title = `${episode.type}${episode.number}. ${episode.title}`;
    this.introduction = episode.introduction;
    this.#props = createEpisodeElementProps(episode);
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
  selectionNotifier(): Observable<EpisodeID> {
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

  /**
   * チェックされているか否かを判定する
   * @return trueでチェックされている
   */
  isChecked(): boolean {
    return isChecked(this.#props);
  }
}
