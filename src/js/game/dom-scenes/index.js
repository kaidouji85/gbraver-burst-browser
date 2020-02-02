// @flow

import {Observable} from "rxjs";
import {Title} from "./title";
import type {EndTitle} from "../../action/game/end-title";
import {HowToPlay} from "./how-to-play";

/** イベント通知 */
type Notifier = {
  endTitle: Observable<EndTitle>
};

/** HTMLオンリーで生成されたシーンを集めたもの */
export class DOMScenes {
  _title: Title;
  _howToPlay: HowToPlay;

  constructor() {
    const titleDOM: HTMLElement = document.querySelector("#title-scene") || document.createElement('div');
    this._title = new Title(titleDOM);

    const howToPlayDOM: HTMLElement = document.getElementById('how-to-play') || document.createElement('div');
    this._howToPlay = new HowToPlay(howToPlayDOM);
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

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定
   */
  hidden(): void {
    this._title.hidden();
  }
}