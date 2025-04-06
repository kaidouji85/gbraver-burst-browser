import { Observable, Unsubscribable } from "rxjs";

import { EpisodeID, EpisodeType } from "../../../game/story/episodes/episode";
import { Resources } from "../../../resource";
import { Episode } from "../episode";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { checked } from "./procedure/checked";
import { createEpisodeElementProps } from "./procedure/create-episode-element-props";
import { isChecked } from "./procedure/is-checked";
import { isVisible } from "./procedure/is-visible";
import { visible } from "./procedure/visible";
import { EpisodeElementProps } from "./props";

/** エピソードHTML要素 */
export class EpisodeElement {
  /** エピソードID */
  readonly id: EpisodeID;
  /** エピソードタイプ */
  readonly type: EpisodeType;
  /** プロパティ */
  #props: EpisodeElementProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param episode エピソード情報
   */
  constructor(resources: Resources, episode: Episode) {
    this.id = episode.id;
    this.type = episode.type;
    this.#props = createEpisodeElementProps(resources, episode);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscribe) => unsubscribe.unsubscribe());
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 選択通知
   * @returns 通知ストリーム
   */
  selectionNotifier(): Observable<void> {
    return this.#props.select;
  }

  /**
   * チェックされているか否かを判定する
   * @returns trueでチェックされている
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

  /**
   * 表示、非表示を切り替える
   * @param isVisible trueで表示する
   */
  visible(isVisible: boolean): void {
    visible(this.#props, isVisible);
  }

  /**
   * 表示されているか否かを判定する
   * @returns trueで表示されている
   */
  isVisible(): boolean {
    return isVisible(this.#props);
  }
}
