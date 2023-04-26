import { PilotButtonConfig } from "./config";
import { engage } from "./procedure/engage";
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

  /**
   * 設定をボタンに反映させる
   * @param config 反映させる設定
   */
  engage(config: Readonly<PilotButtonConfig>): void {
    engage(this.#props, config);
  }
}
