/// @flow

import {Observable} from "rxjs";
import {TitlePresentation} from "./title-view";
import type {DOMScene} from "../dom-scene";
import type {Resources} from "../../../resource";

/** イベント通知 */
export type Notifier = {
  pushGameStart: Observable<void>,
  pushHowToPlay: Observable<void>,
};

/** タイトルシーン */
export class Title implements DOMScene {
  _presentation: TitlePresentation;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._presentation = new TitlePresentation(resources);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._presentation.destructor();
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._presentation.waitUntilLoaded();
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return this._presentation.notifier();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return {HTMLElement}
   */
  getRootHTMLElement(): HTMLElement {
    return this._presentation.getRootHTMLElement();
  }
}
