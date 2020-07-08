// @flow

import type {ResourceRoot} from "../../../../resource/root/resource-root";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";

/**
 * イベント通知
 */
type Notifier = {
  screenPush: Observable<void>
};

/**
 * NPCルート エンディング ビュー
 */
export class NPCEndingView {
  _root: HTMLElement;
  _isEndCardLoaded: Promise<void>;
  _isEndLoaded: Promise<void>;
  _isLogoLoader: Promise<void>;
  _screenPush: Subject<void>;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourceRoot) {
    this._screenPush = new Subject();

    const endId = domUuid();
    const logoId = domUuid();

    this._root = document.createElement('div');
    this._root.className = 'npc-ending';
    this._root.innerHTML = `
      <img class="npc-ending__end" data-id="${endId}">
      <img class="npc-ending__logo" data-id="${logoId}">
    `;

    const titleBackImage = new Image();
    this._isEndCardLoaded = new Promise(resolve => {
      titleBackImage.addEventListener('load', () => {
        this._root.style.backgroundImage = `url(${titleBackImage.src})`;
        resolve();
      });
    }) ;
    titleBackImage.src = `${resourcePath.get()}/ending/end-card.png`;

    const end = this._root.querySelector(`[data-id="${endId}"]`);
    const endImage: HTMLImageElement = (end instanceof HTMLImageElement)
      ? end
      : new Image();
    this._isEndLoaded =  new Promise(resolve => {
      endImage.addEventListener('load', () => {
        resolve();
      });
    });
    endImage.src = `${resourcePath.get()}/ending/end.png`;

    const logo = this._root.querySelector(`[data-id="${logoId}"]`);
    const logoImage = (logo instanceof  HTMLImageElement)
      ? logo
      : new Image();
    this._isLogoLoader = new Promise(resolve => {
      logoImage.addEventListener('load', () => {
        resolve();
      });
    });
    logoImage.src = `${resourcePath.get()}/logo.png`;

    this._root.addEventListener('click', (e: MouseEvent) => {
      this._screenPush.next();
    });
    this._root.addEventListener('touchstart', (e: TouchEvent) => {
      this._screenPush.next();
    });
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
    try {
      await Promise.all([
        this._isEndCardLoaded,
        this._isEndLoaded,
        this._isLogoLoader,
      ]);
    } catch(e) {
      throw e;
    }
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
