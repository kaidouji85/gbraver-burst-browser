import { Observable } from "rxjs";

import { EpisodeID } from "../../../game/episodes/episode";
import { Episode } from "../episode";
import { check } from "./procedure/check";
import { isChecked } from "./procedure/is-checked";
import { uncheck } from "./procedure/uncheck";
import { createEpisodeElementProps, EpisodeElementProps } from "./props";

/** エピソードHTML要素 */
export class EpisodeElement {
  /** エピソードID */
  readonly id: EpisodeID;
  /** プロパティ */
  #props: EpisodeElementProps;

  /**
   * コンストラクタ
   * @param episode エピソード情報
   */
  constructor(episode: Episode) {
    this.id = episode.id;
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

  /**
   * チェックされているか否かを判定する
   * @return trueでチェックされている
   */
  isChecked(): boolean {
    return isChecked(this.#props);
  }
}
