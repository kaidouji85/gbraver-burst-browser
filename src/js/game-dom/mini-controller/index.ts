import { MiniControllerProps, createMiniControllerProps } from "./props";

/** ミニコントローラ */
export class MiniController {
  /** プロパティ */
  #props: MiniControllerProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createMiniControllerProps();
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}