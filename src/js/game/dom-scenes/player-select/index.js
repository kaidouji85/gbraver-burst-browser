// @flow

import type {ResourcePath} from "../../../resource/path/resource-path";
import {PlayerSelectView} from "./view/player-select-view";
import type {PlayerSelectState} from "./state/player-select-state";
import {createInitialState} from "./state/initial-state";
import type {DOMScene} from "../dom-scene";
import {Observable} from "rxjs";
import type {SelectionComplete} from "../../../action/player-select/selection-complete";
import {map} from "rxjs/operators";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

/**
 * イベント通知
 */
export type Notifier = {
  selectionComplete: Observable<SelectionComplete>
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

    const armDozerIds = [
      ArmDozerIdList.NEO_LANDOZER,
      ArmDozerIdList.SHIN_BRAVER,
      ArmDozerIdList.LIGHTNING_DOZER,
    ];
    this._view = new PlayerSelectView(resourcePath, armDozerIds);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
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
    this._view.show();
  }

  /**
   * 本シーンを非表示にする
   */
  hidden(): void {
    this._view.hidden();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return 取得結果
   */
  notifier(): Notifier {
    return {
      selectionComplete: this._view.notifier().select.pipe(
        map(id => ({
          type: 'SelectionComplete',
          armdozerId: id
        }))
      )
    };
  }
}
