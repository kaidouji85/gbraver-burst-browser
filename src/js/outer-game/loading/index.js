// @flow

import type {LoadingState} from "./state/loading-state";
import {LoadingView} from "./view/loading-view";
import {createInitialState} from "./state/initial-value";
import {progress} from "./state/progress";
import {complete} from "./state/complete";
import type {LoadingAction, LoadingComplete, LoadingProgress} from "../../action/loading/loading";
import {Observable, Subscription} from "rxjs";

/** ローディング */
export class Loading {
  _state: LoadingState;
  _view: LoadingView;
  _subscription: Subscription;

  constructor(loading: Observable<LoadingAction>) {
    this._state = createInitialState();
    this._view = new LoadingView();
    this._subscription = loading.subscribe(action => {
      if (action.type === 'LoadingProgress') {
        this._onLoadingProgress(action);
      } else if (action.type === 'LoadingComplete') {
        this._onLoadingComplete(action);
      }
    });

    this._view.engage(this._state);
  }

  /** デストラクタ相当の処理 */
  destrucotr(): void {
    this._subscription.unsubscribe();
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  _onLoadingProgress(action: LoadingProgress): void {
    this._state = progress(this._state, action.completedRate);
    this._view.engage(this._state);
  }

  /**
   * リソースのローディングが完了した際のイベント
   *
   * @param action アクション
   */
  _onLoadingComplete(action: LoadingComplete): void {
    this._state = complete(this._state);
    this._view.engage(this._state);
  }
}
