// @flow

import {PlayInLandscape} from "./play-in-landscape";
import type {ResourceRoot} from "../../resource/root/resource-root";

/**
 * 割り込みで表示されるシーンをあつめたもの
 */
export class InterruptScenes {
  _playInLandscape: PlayInLandscape;

  /**
   * コンストラクタ
   *
   * @param resourceRoot リソースルート
   */
  constructor(resourceRoot: ResourceRoot) {
    this._playInLandscape = new PlayInLandscape(resourceRoot);
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