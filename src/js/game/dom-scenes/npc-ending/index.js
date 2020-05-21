// @flow

import type {DOMScene} from "../dom-scene";
import type {ResourcePath} from "../../../resource/path/resource-path";
import {Observable, Subject} from "rxjs";
import type {EndNpcEnding} from "../../../action/game/npc-ending";

/** イベント通知 */
type Notifier  = {
  endNpcEnding: Observable<EndNpcEnding>
};

/**
 * NPCルート エンディング
 */
export class NPCEnding implements DOMScene {
  _root: HTMLElement;
  _end: Subject<EndNpcEnding>;

  constructor(resourcePath: ResourcePath) {
    this._end = new Subject();

    this._root = document.createElement('div');
    this._root.className = 'npc-ending';
    this._root.innerHTML = `
      <img class="npc-ending__end" src="${resourcePath.get()}/ending/end.png">
      <img class="npc-ending__logo" src="${resourcePath.get()}/logo.png">
    `;
    this._root.style.backgroundImage = `url(${resourcePath.get()}/ending/end-card.png)`;
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
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * イベント通知
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      endNpcEnding: this._end
    };
  }
}