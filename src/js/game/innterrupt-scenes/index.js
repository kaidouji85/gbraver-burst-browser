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
    this._loading = new Loading(param.loading);
    this._playInLandscape = new PlayInLandscape(param.resourcePath);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._loading.destructor();
  }

  showLoading(): void {
    this._loading.show();
  }

  hiddenLoading(): void {
    this._loading.hidden();
  }

  /**
   * 本クラスに含まれるルートHTML要素を返す
   *
   * @return 取得結果
   */
  getRootHTMLElements(): HTMLElement[] {
    return [
      this._loading.getRootHTMLElement(),
      this._playInLandscape.getRootHTMLElement(),
    ];
  }
}