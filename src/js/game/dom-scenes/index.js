// @flow

import {Observable} from "rxjs";
import {Title} from "./title";
import type {EndTitle} from "../../action/game/end-title";

/** イベント通知 */
type Notifier = {
  endTitle: Observable<EndTitle>
};

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  _title: Title;

  constructor() {
    const titleDOM: HTMLElement = document.querySelector("#title-scene") || document.createElement('div');
    this._title = new Title(titleDOM);
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._title.destructor();
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

  /** タイトルを表示する */
  showTitle(): void {
    this._title.show();
  }

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    this._title.hidden();
  }
}