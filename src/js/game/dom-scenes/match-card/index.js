// @flow

import type {DOMScene} from "../dom-scene";
import {MatchCardView} from "./view/match-card-view";
import type {ResourcePath} from "../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core";

/**
 * コンストラクタのパラメータ
 */
type Param = {
  resourcePath: ResourcePath,
  player: ArmDozerId,
  enemy: ArmDozerId,
  caption: string,
};

/**
 * 対戦カード
 */
export class MatchCard implements DOMScene {
  _view: MatchCardView;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param): void {
    this._view = new MatchCardView(param.resourcePath, param.player, param.enemy, param.caption);
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
    return this._view.waitUntilLoaded();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }
}