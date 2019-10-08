// @flow

import type {Scene} from "../scene";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameLoop} from "../../action/game-loop/game-loop";
import type {DOMEvent} from "../../action/dom-event";
import {TitleView} from "./view";
import type {Render} from "../../action/game-loop/render";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>
};

/** タイトルシーン */
export class Title implements Scene {
  _view: TitleView;

  constructor(param: Param) {
    this._view = new TitleView({
      rendererDOM: param.rendererDOM,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._view.destructor();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._view.notifier().render
    }
  }
}