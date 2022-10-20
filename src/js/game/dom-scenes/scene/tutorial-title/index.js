// @flow
import type { DOMScene } from "../../dom-scene";
import type { CreatePropsParams, TutorialTitleProps } from "./props";
import { createTutorialTitleProps } from "./props";

/** チュートリアルタイトル画面パラメータ */
export type TutorialTitleParams = CreatePropsParams;

/** チュートリアル タイトル画面 */
export class TutorialTitle implements DOMScene {
  /** プロパティ */
  #props: TutorialTitleProps;

  /**
   * コンストラクタ
   *
   * @param params パラメータ
   */
  constructor(params: TutorialTitleParams) {
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
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#props.isStandLoaded,
      this.#props.isBustShotLoaded,
    ]);
  }
}
