// @flow

import type {DOMScene} from "../dom-scene";
import {MatchCardPresentation} from "./presentation";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../resource";

/**
 * コンストラクタのパラメータ
 */
type Param = {
  resources: Resources,
  player: ArmDozerId,
  enemy: ArmDozerId,
  caption: string,
};

/**
 * 対戦カード
 */
export class MatchCard implements DOMScene {
  _presentation: MatchCardPresentation;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param): void {
    this._presentation = new MatchCardPresentation(param.resources, param.player, param.enemy, param.caption);
  }
  
  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._presentation.waitUntilLoaded();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._presentation.getRootHTMLElement();
  }
}