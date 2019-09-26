// @flow

import * as THREE from 'three';
import type {LoadingModel} from "./model/loading-model";
import {LoadingView} from "./view/loading-view";
import {createInitialValue} from "./model/initial-value";
import {progress} from "./model/progress";
import {complete} from "./model/complete";
import {start} from "./model/start";

/** ローディング画面管理クラス */
export class Loading {
  _model: LoadingModel;
  _view: LoadingView;

  constructor() {
    this._model = createInitialValue();
    this._view = new LoadingView();
  }

  /**
   * ローディングを開始する
   *
   * @param loadingManager ローディングマネジャ
   */
  start(loadingManager: THREE.LoadingManager): void {
    loadingManager.onProgress = this._onProgress.bind(this);
    loadingManager.onLoad = this._onComplete.bind(this);

    this._model = start(this._model);
    this._view.engage(this._model);
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param url 読み込んだリソースのURL
   * @param itemsLoaded これまでに読み込んだリソース数
   * @param itemsTotal トータルのリソース数
   */
  _onProgress(url: string, itemsLoaded: number, itemsTotal: number): void {
    this._model = progress(this._model, itemsLoaded, itemsTotal);
    this._view.engage(this._model);
  }

  /**
   * リソースのローディングが完了した際のイベント
   *
   * @param url 最後に読み込んだリソースのURL
   */
  _onComplete(url: string): void {
    this._model = complete(this._model);
    this._view.engage(this._model);
  }
}