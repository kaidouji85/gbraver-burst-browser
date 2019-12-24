// @flow

import {render} from 'react-dom';
import type {LoadingState} from "./state/loading-state";
import {createInitialState} from "./state/initial-value";
import {progress} from "./state/progress";
import {complete} from "./state/complete";
import type {LoadingAction, LoadingComplete, LoadingProgress, LoadingStart} from "../../../action/loading/loading";
import {Observable, Subscription} from "rxjs";
import {loadingView} from "./view/loading-view";

/** ローディング */
export class Loading {
  _dom: HTMLElement;
  _state: LoadingState;
  _subscription: Subscription;

  constructor(dom: HTMLElement, loading: Observable<LoadingAction>) {
    this._dom = dom;
    this._state = createInitialState();
    this._subscription = loading.subscribe(action => {
      if (action.type === 'LoadingStart') {
        this._onLoadingStart(action);
      } else if (action.type === 'LoadingProgress') {
        this._onLoadingProgress(action);
      } else if (action.type === 'LoadingComplete') {
        this._onLoadingComplete(action);
      }
    });

    this._engage();
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /** ステートをビューに反映させる */
  _engage(): void {
    const component = loadingView({
      state: this._state
    });
    render(component, this._dom);
  }

  /**
   * リソースロードが開始された
   *
   * @param action アクション
   */
  _onLoadingStart(action: LoadingStart): void {
    this._state = {...this._state, isVisible: true};
    this._engage();
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  _onLoadingProgress(action: LoadingProgress): void {
    this._state = progress(this._state, action.completedRate);
    this._engage();
  }

  /**
   * リソースのローディングが完了した際のイベント
   *
   * @param action アクション
   */
  _onLoadingComplete(action: LoadingComplete): void {
    this._state = complete(this._state);
    this._engage();
  }
}
