// @flow

import * as THREE from 'three';
import type {LoadingModel} from "./loading-model";
import {LoadingView} from "./loading-view";

export class Loading {
  _model: LoadingModel;
  _view: LoadingView;

  constructor() {
    this._model = {
      isVisible: true,
      caption: {
        isVisible: false,
        value: ''
      },
      completedRate: {
        isVisible: false,
        value: 0
      }
    };
    this._view = new LoadingView();
  }

  start(loadingManager: THREE.LoadingManager): void {
    loadingManager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
      this._onProgress(itemsLoaded, itemsTotal);
    };
    loadingManager.onLoad = (url: string) => {
      this._onComplete();
    };

    this._model = {
      ...this._model,
      completedRate: {
        isVisible: true,
        value: 0
      }
    };
    this._view.engage(this._model);
  }

  _onProgress(itemsLoaded: number, itemsTotal: number): void {
    this._model = {
      ... this._model,
      completedRate: {
        ...this._model.completedRate,
        isVisible: true,
        value: itemsLoaded / itemsTotal
      }
    };
    this._view.engage(this._model);
  }

  _onComplete(): void {
    this._model = {
      ...this._model,
      isVisible: false
    };
    this._view.engage(this._model);
  }
}