// @flow

import type {TitleState} from "../state/title-state";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";
import type {ResourcePath} from "../../../../resource/path/resource-path";

/** イベント通知 */
type Notifier = {
  gameStart: Observable<void>,
  howToPlay: Observable<void>,
};

/** コンストラクタのパラメータ */
type Params = {
  /** 初期状態 */
  initialState: TitleState,
  /** リソースパス */
  resourcePath: ResourcePath,
};

/** タイトルビュー */
export class TitleView {
  _gameStartStream: Subject<void>;
  _howToPlayStream: Subject<void>;
  _root: HTMLElement;
  _gameStart: HTMLElement;
  _howToPlay: HTMLElement;

  constructor(params: Params) {
    this._gameStartStream = new Subject();
    this._howToPlayStream = new Subject();
    this._root = document.createElement('div');

    const gameStartId = domUuid();
    const howToPlayId = domUuid();
    this._root.innerHTML = `
      <div class="title__contents">
        <img class="title__contents__logo" src="${params.resourcePath.get()}/logo.png"/>
        <div class="title__contents__copy-rights">
          <span class="title__contents__copy-rights__row">(C) 2020 Yuusuke Takeuchi</span>
        </div>
        <div class="title__contents__controllers">
          <button class="title__contents__controllers__game-start" data-id="${gameStartId}" >ゲームスタート</button>
          <button class="title__contents__controllers__how-to-play" data-id="${howToPlayId}">遊び方</button>
        </div>
      </div>
    `;
    this._root.style.backgroundImage = `url(${params.resourcePath.get()}/title-back.png)`;

    this._gameStart = this._root.querySelector(`[data-id="${gameStartId}"]`) || document.createElement('div');
    this._gameStart.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._gameStartStream.next();
    });
    this._gameStart.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._gameStartStream.next();
    });

    this._howToPlay = this._root.querySelector(`[data-id="${howToPlayId}"]`) || document.createElement('div');
    this._howToPlay.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      this._howToPlayStream.next();
    });
    this._howToPlay.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this._howToPlayStream.next();
    });

    this.engage(params.initialState);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param state ステート
   */
  engage(state: TitleState): void {
    this._root.className = state.isVisible
      ? 'title landscape-only'
      : 'title--invisible';
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      gameStart: this._gameStartStream,
      howToPlay: this._howToPlayStream,
    };
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}