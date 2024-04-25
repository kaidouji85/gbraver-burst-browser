import { DOMScene } from "../dom-scene";
import {
  CreateStageTitleParams,
  createStageTitleProps,
} from "./procedures/create-stage-title-props";
import { setCaption } from "./procedures/set-caption";
import { StageTitleProps } from "./props";

/** ステージタイトルのパラメータ */
export type StageTitleParam = CreateStageTitleParams & {
  /** ステージ名 */
  caption: string[];
};

/** ステージタイトル */
export class StageTitle implements DOMScene {
  /** プロパティ */
  #props: StageTitleProps;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: StageTitleParam) {
    this.#props = createStageTitleProps(params);
    setCaption(this.#props, params.caption);
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
    await this.#props.isArmdozerIconLoaded;
  }
}
