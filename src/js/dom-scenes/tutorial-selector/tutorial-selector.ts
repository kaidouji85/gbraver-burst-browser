import { Observable, Unsubscribable } from "rxjs";

import type { Resources } from "../../resource";
import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./listeners/bind-event-listeners";
import { createTutorialSelectorProps, TutorialSelectorProps } from "./props";
import { TutorialStage } from "./tutorial-stage-element/tutorial-stage";
import { TutorialStageSelect } from "./tutorial-stage-element/tutorial-stage-select";

/** チュートリアルステージセレクト画面 */
export class TutorialSelector implements DOMScene {
  /** プロパティ */
  #props: TutorialSelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param stages チュートリアルステージ情報
   */
  constructor(resources: Resources, stages: TutorialStage[]) {
    this.#props = createTutorialSelectorProps(resources, stages);
    this.#unsubscribers = bindEventListeners(this.#props);
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
   * チュートリアルステージ選択通知
   * @return 通知ストリーム
   */
  notifyStageSelection(): Observable<TutorialStageSelect> {
    return this.#props.stageSelect;
  }
}
