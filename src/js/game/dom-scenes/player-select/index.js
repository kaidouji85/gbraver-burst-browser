// @flow

import type {ResourcePath} from "../../../resource/path/resource-path";
import {PlayerSelectView} from "./view/player-select-view";
import type {PlayerSelectState} from "./state/player-select-state";
import {createInitialState} from "./state/initial-state";
import type {DOMScene} from "../dom-scene";
import {Observable} from "rxjs";
import type {SelectArmdozer} from "../../../action/player-select/select-armdozer";
import {map} from "rxjs/operators";

/**
 * イベント通知
 */
export type Notifier = {
  selectArmdozer: Observable<SelectArmdozer>
};

/**
 * プレイヤーセレクト
 */
export class PlayerSelect implements DOMScene {
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
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }

  /**
   * 本シーンを表示する
   */
  show(): void {
    this._state.isVisible = true;
    this._view.engage(this._state);
  }

  /**
   * 本シーンを非表示にする
   */
  hidden(): void {
    this._state.isVisible = false;
    this._view.engage(this._state);
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return 取得結果
   */
  notifier(): Notifier {
    return {
      selectArmdozer: this._view.notifier().select.pipe(
        map(id => ({
          type: 'SelectArmdozer',
          armdozerId: id
        }))
      )
    };
  }
}
