import type { DOMScene } from "../dom-scene";
import type { CreatePropsParams, EpisodeTitleProps } from "./props";
import { createEpisodeTitleProps } from "./props";

/** エピソードタイトル画面パラメータ */
export type EpisodeTitleParams = CreatePropsParams;

/** エピソードタイトル画面 */
export class EpisodeTitle implements DOMScene {
  /** プロパティ */
  #props: EpisodeTitleProps;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: EpisodeTitleParams) {
    this.#props = createEpisodeTitleProps(params);
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
   * @returns 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#props.isStandLoaded,
      this.#props.isBustShotLoaded,
    ]);
  }
}
