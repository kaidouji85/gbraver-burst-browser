// @flow

import type {ResourcePath} from "../../../resource/path/resource-path";
import {PlayerSelectView} from "./view/player-select-view";
import type {PlayerSelectState} from "./state/player-select-state";
import {createInitialState} from "./state/initial-state";

/**
 * プレイヤーセレクト
 */
export class PlayerSelect {
  _state: PlayerSelectState;
  _view: PlayerSelectView;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._state = createInitialState(resourcePath);
    this._view = new PlayerSelectView(resourcePath, this._state);
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }
}
