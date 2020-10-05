// @flow

import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable} from "rxjs";
import type {Resources} from "../../../../resource";
import {PathIds} from "../../../../resource/path";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";
import type {PushDOM} from "../../../../action/push/push-dom";

/**
 * イベント通知
 */
type Notifier = {
  screenPush: Observable<PushDOM>
};

/**
 * NPCルート エンディング ビュー
 */
export class NPCEndingView {
  _root: HTMLElement;
  _isEndCardLoaded: Promise<void>;
  _isEndLoaded: Promise<void>;
  _isLogoLoader: Promise<void>;
  _screenPush: Observable<PushDOM>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const endId = domUuid();
    const logoId = domUuid();

    this._root = document.createElement('div');
    this._root.className = 'npc-ending';
    this._root.innerHTML = `
      <img class="npc-ending__end" data-id="${endId}">
      <img class="npc-ending__logo" data-id="${logoId}">
    `;

    const titleBackImage = new Image();
    this._isEndCardLoaded = waitElementLoaded(titleBackImage)
      .then(() => {
        this._root.style.backgroundImage = `url(${titleBackImage.src})`;
      });
    titleBackImage.src = resources.paths
      .find(v => v.id === PathIds.END_CARD)
      ?.path ?? '';

    const end = this._root.querySelector(`[data-id="${endId}"]`);
    const endImage = (end instanceof HTMLImageElement) ? end : new Image();
    this._isEndLoaded = waitElementLoaded(endImage);
    endImage.src = resources.paths
      .find(v => v.id === PathIds.END)
      ?.path ?? '';

    const logo = this._root.querySelector(`[data-id="${logoId}"]`);
    const logoImage = (logo instanceof  HTMLImageElement) ? logo : new Image();
    this._isLogoLoader = waitElementLoaded(logoImage);
    logoImage.src = resources.paths
      .find(v => v.id === PathIds.LOGO)
      ?.path ?? '';

    this._screenPush = pushDOMStream(this._root);
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
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this._isEndCardLoaded,
      this._isEndLoaded,
      this._isLogoLoader,
    ]);
  }

  /**
   * イベント通知
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      screenPush: this._screenPush,
    };
  }
}
