// @flow

import {PlayInLandscape} from "./play-in-landscape";
import type {ResourcePath} from "../../resource/path/resource-path";

/** コンストラクタのパラメータ */
type Param = {
  resourcePath: ResourcePath,
};

/**
 * 割り込みで表示されるシーンをあつめたもの
 */
export class InterruptScenes {
  _playInLandscape: PlayInLandscape;

  constructor(param: Param) {
    this._playInLandscape = new PlayInLandscape(param.resourcePath);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    // NOP
  }


  /**
   * 本クラスに含まれるルートHTML要素を返す
   *
   * @return 取得結果
   */
  getRootHTMLElements(): HTMLElement[] {
    return [
      this._playInLandscape.getRootHTMLElement(),
    ];
  }
}