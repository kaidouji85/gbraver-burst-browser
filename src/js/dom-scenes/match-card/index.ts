import type { DOMScene } from "../dom-scene";
import {
  createMatchCardProps,
  PropsCreatorParams,
} from "./procedures/create-match-card-props";
import { MatchCardProps } from "./props";

/** コンストラクタのパラメータ */
type MatchCardParams = PropsCreatorParams;

/** 対戦カード画面 */
export class MatchCard implements DOMScene {
  /** 画面プロパティ */
  #props: MatchCardProps;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: MatchCardParams) {
    this.#props = createMatchCardProps(param);
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([this.#props.isPlayerLoaded, this.#props.isEnemyLoaded]);
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
