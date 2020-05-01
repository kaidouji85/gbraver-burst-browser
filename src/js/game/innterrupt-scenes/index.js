// @flow

import {Loading} from "./loading";
import {Observable} from "rxjs";
import type {LoadingAction} from "../../action/loading/loading";
import {PlayInLandscape} from "./play-in-landscape";
import type {ResourcePath} from "../../resource/path/resource-path";

/** コンストラクタのパラメータ */
type Param = {
  resourcePath: ResourcePath,
  loading: Observable<LoadingAction>,
};

/**
 * 割り込みで表示されるシーンをあつめたもの
 */
export class InterruptScenes {
  _loading: Loading;
  _playInLandscape: PlayInLandscape;

  constructor(param: Param) {
    const loadingDOM: HTMLElement = document.querySelector('#loading-scene') || document.createElement('div');
    this._loading = new Loading(param.loading);
    loadingDOM.appendChild(this._loading.getRootHTMLElement());

    const playInLandscapeDOM: HTMLElement = document.querySelector("#play-in-landscape") || document.createElement('div');
    this._playInLandscape = new PlayInLandscape(param.resourcePath);
    playInLandscapeDOM.appendChild(this._playInLandscape.getRootHTMLElement());
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._loading.destructor();
  }
}