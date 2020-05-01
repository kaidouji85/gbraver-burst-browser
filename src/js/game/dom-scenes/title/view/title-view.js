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
      <div class="title">
        <div class="title__logo">
          <img class="title__logo__image" src="${params.resourcePath.get()}/logo.png"/>
          <div class="title__logo__copy-right">(C) 2020 Yuusuke Takeuchi</div>
        </div>
        <div class="title__controllers">
          <button class="title__controllers__game-start" data-id="${gameStartId}" >ゲームスタート</button>
          <button class="title__controllers__how-to-play" data-id="${howToPlayId}">遊び方</button>
        </div>
      </div>
    `;

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
      ? 'title'
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

  getHTMLElement(): HTMLElement {
    return this._root;
  }
}