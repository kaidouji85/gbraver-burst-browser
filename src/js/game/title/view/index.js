// @flow

import {Observable} from "rxjs";
import type {DOMEvent} from "../../../action/dom-event";
import {TitleHudLayer} from "./hud";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>
  }
};

/** タイトルシーンビュー */
export class TitleView {
  hud: TitleHudLayer;

  constructor(param: Param) {
    this.hud = new TitleHudLayer({
      listener: {
        domEvent: param.listener.domEvent
      }
    });
  }

  /** デストラクタ相当処理 */
  destructor(): void {
    this.hud.destructor();
  }
}