import type { DOMScene } from "../dom-scene";
import type { CreatePropsParams, TutorialTitleProps } from "./props";
import { createTutorialTitleProps } from "./props";

/** エピソードタイトル画面パラメータ */
export type EpisodeTitleParams = CreatePropsParams;

/** エピソードタイトル画面 */
export class EpisodeTitle implements DOMScene {
  /** プロパティ */
  #props: TutorialTitleProps;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: EpisodeTitleParams) {
    this.#props = createTutorialTitleProps(params);
  }

  /** @override */
  destructor(): void {
    // NOP
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
    await Promise.all([
      this.#props.isStandLoaded,
      this.#props.isBustShotLoaded,
    ]);
  }
}
