// @flow

import type {LoadingActions, LoadingProgress} from "../../../resource/actions/loading-actions";
import {LoadingPresentation} from "./presentation";
import type {DOMScene} from "../dom-scene";
import type {Stream, Unsubscriber} from "../../../stream/core";

/**
 * ローディング
 */
export class Loading implements DOMScene {
  _completedRate: number;
  _presentation: LoadingPresentation;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param loading ローディングストリーム
   */
  constructor(loading: Stream<LoadingActions>) {
    this._completedRate = 0;
    this._presentation = new LoadingPresentation();
    this._unsubscriber = loading.subscribe(action => {
      if (action.type === 'LoadingProgress') {
        this._onLoadingProgress(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._unsubscriber.unsubscribe();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._presentation.getRootHTMLElement();
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  _onLoadingProgress(action: LoadingProgress): void {
    this._completedRate = Math.max(action.completedRate, this._completedRate);
    this._presentation.setCompletedRate(this._completedRate);
  }
}
