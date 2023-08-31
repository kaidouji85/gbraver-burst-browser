import type { DOMScene } from "../dom-scene";
import {
  CreateStageTitleParams,
  createStageTitleProps,
} from "./procedures/create-stage-title-props";
import { StageTitleProps } from "./props";

/** ステージタイトルのパラメータ */
export type StageTitleParam = CreateStageTitleParams;

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
    await this.#props.isArmdozerIconLoaded;
  }
}
