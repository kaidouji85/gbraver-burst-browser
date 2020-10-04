// @flow

import type {LoadingState} from "./state/loading-state";
import {createInitialState} from "./state/initial-value";
import {progress} from "./state/progress";
import type {LoadingAction, LoadingProgress} from "../../../action/loading/loading";
import {Observable, Subscription} from "rxjs";
import {LoadingView} from "./view/loading-view";
import type {DOMScene} from "../dom-scene";

/** ローディング */
export class Loading implements DOMScene {
  _state: LoadingState;
  _view: LoadingView;
  _subscription: Subscription;

  constructor(loading: Observable<LoadingAction>) {
    this._state = createInitialState();
    this._view = new LoadingView();
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
    this._state = progress(this._state, action.completedRate);
    this._view.setCompletedRate(this._state.completedRate);
  }
}
