import { Observable } from "rxjs";

import { EpisodeID } from "../../../game/episodes/episode";
import { Episode } from "../episode";
import { checked } from "./procedure/checked";
import { isChecked } from "./procedure/is-checked";
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
  selectionNotifier(): Observable<unknown> {
    return this.#props.select;
  }

  /**
   * チェックされているか否かを判定する
   * @return trueでチェックされている
   */
  isChecked(): boolean {
    return isChecked(this.#props);
  }

  /**
   * チェック状態を変更する
   * @param isChecked trueでチェックする
   */
  checked(isChecked: boolean): void {
    checked(this.#props, isChecked);
  }
}
