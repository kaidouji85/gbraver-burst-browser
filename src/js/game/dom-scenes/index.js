// @flow

import {Observable} from "rxjs";
import {Title} from "./title";
import type {EndTitle} from "../../action/game/end-title";

/** イベント通知 */
type Notifier = {
  endTitle: Observable<EndTitle>
};

/** HTMLオンリーで生成されたシーンを集めたもの */
export class DOMScenes {
  _title: Title;

  constructor() {
    const titleDOM: HTMLElement = document.querySelector("#title-scene") || document.createElement('div');
    this._title = new Title(titleDOM);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    // NOP
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      endTitle: this._title.notifier().endTitle,
    };
  }
}