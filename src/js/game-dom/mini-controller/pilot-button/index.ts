import { PilotButtonProps, createPilotButtonProps } from "./props";

/** パイロットボタン */
export class PilotButton {
  /** プロパティ */
  #props: PilotButtonProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPilotButtonProps();
  }

  /**
   * ルートHTML要素を取得する
   * @retur 取得結果
   */
  getRootHTMLElement(): HTMLButtonElement {
    return this.#props.root;
  }
}
