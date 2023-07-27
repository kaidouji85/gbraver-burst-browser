import type { ArmDozerId } from "gbraver-burst-core";

import type { Resources } from "../../resource";
import type { DOMScene } from "../dom-scene";
import { MatchCardPresentation } from "./presentation";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** プレイヤー情報 */
  player: ArmDozerId;
  /** 敵情報 */
  enemy: ArmDozerId;
  /** キャプション */
  caption: string;
};

/** 対戦カード画面 */
export class MatchCard implements DOMScene {
  #presentation: MatchCardPresentation;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#presentation = new MatchCardPresentation(
      param.resources,
      param.player,
      param.enemy,
      param.caption,
    );
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this.#presentation.waitUntilLoaded();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#presentation.getRootHTMLElement();
  }
}
