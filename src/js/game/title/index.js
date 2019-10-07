// @flow

import type {Scene} from "../scene";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameLoop} from "../../action/game-loop/game-loop";
import type {DOMEvent} from "../../action/dom-event";

type Param = {
  resources: Resources,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>
  }
};

/** タイトルシーン */
export class Title implements Scene {
  constructor(param: Param) {

  }

  /** デストラクタ相当の処理 */
  destructor() {
    // NOP
  }
}