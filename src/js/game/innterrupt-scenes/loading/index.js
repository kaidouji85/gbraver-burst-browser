// @flow

import type {LoadingState} from "./state/loading-state";
import {createInitialState} from "./state/initial-value";
import {progress} from "./state/progress";
import {complete} from "./state/complete";
import type {LoadingAction, LoadingComplete, LoadingProgress, LoadingStart} from "../../../action/loading/loading";
import {Observable, Subscription} from "rxjs";
import {LoadingView} from "./view/loading-view";

/** ローディング */
export class Loading {
  _state: LoadingState;
  _view: LoadingView;
  _subscription: Subscription;

  constructor(loading: Observable<LoadingAction>) {
    this._state = createInitialState();
    this._view = new LoadingView(this._state);
    this._subscription = loading.subscribe(action => {
      if (action.type === 'LoadingStart') {
        this._onLoadingStart(action);
      } else if (action.type === 'LoadingProgress') {
        this._onLoadingProgress(action);
      } else if (action.type === 'LoadingComplete') {
        this._onLoadingComplete(action);
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
   * リソースロードが開始された
   *
   * @param action アクション
   */
  _onLoadingStart(action: LoadingStart): void {
    this._state = {...this._state, isVisible: true};
    this._view.engage(this._state);
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
