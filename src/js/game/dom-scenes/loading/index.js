// @flow

import type {LoadingAction, LoadingProgress} from "../../../action/loading/loading";
import {Observable, Subscription} from "rxjs";
import {LoadingPresentation} from "./loading-presentation";
import type {DOMScene} from "../dom-scene";

/**
 * ローディング
 */
export class Loading implements DOMScene {
  _completedRate: number;
  _view: LoadingPresentation;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param loading ローディングストリーム
   */
  constructor(loading: Observable<LoadingAction>) {
    this._completedRate = 0;
    this._view = new LoadingPresentation();
    this._subscription = loading.subscribe(action => {
      if (action.type === 'LoadingProgress') {
        this._onLoadingProgress(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  _onLoadingProgress(action: LoadingProgress): void {
    this._completedRate = Math.max(action.completedRate, this._completedRate);
    this._view.setCompletedRate(this._completedRate);
  }
}
