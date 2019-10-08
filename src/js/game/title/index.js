// @flow

import type {Scene} from "../scene";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameLoop} from "../../action/game-loop/game-loop";
import type {DOMEvent} from "../../action/dom-event";
import {TitleView} from "./view";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>
  }
};

/** タイトルシーン */
export class Title implements Scene {
  _view: TitleView;

  constructor(param: Param) {
    this._view = new TitleView({
      listener: {
        domEvent: param.listener.domEvent
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._view.destructor();
  }
}