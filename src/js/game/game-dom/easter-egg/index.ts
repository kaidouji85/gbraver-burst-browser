import {
  createEasterEggProps,
  CreateEasterEggPropsOptions,
} from "./procedure/create-easter-egg-props";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { EasterEggProps } from "./props";

/** コンストラクタのオプション */
type EasterEggOptions = CreateEasterEggPropsOptions;

/** イースターエッグ */
export class EasterEgg {
  /** プロパティ */
  #props: EasterEggProps;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: EasterEggOptions) {
    this.#props = createEasterEggProps(options);
  }

  /**
   * イースターエッグを表示する
   * @returns アニメーションが終了したら発火するPromise
   */
  async show(): Promise<void> {
    await show(this.#props);
  }

  /**
   * イースターエッグを非表示にする
   * @returns アニメーションが終了したら発火するPromise
   */
  async hidden(): Promise<void> {
    await hidden(this.#props);
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
