// @flow

import type {DOMScene} from "../dom-scene";
import {MatchCardView} from "./view/match-card-view";
import type {ResourcePath} from "../../../resource/path/resource-path";

/**
 * 対戦カード
 */
export class MatchCard implements DOMScene {
  _view: MatchCardView;

  /**
   * コンストラクタ
   */
  constructor(resourcePath: ResourcePath): void {
    this._view = new MatchCardView(resourcePath);
  }
  
  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * シーンを表示する
   */
  show(): void {
    // NOP
  }

  /**
   * シーンを非表示にする
   */
  hidden(): void {
    // NOP
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