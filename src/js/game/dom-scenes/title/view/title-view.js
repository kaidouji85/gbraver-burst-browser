// @flow

import type {TitleState} from "../state/title-state";
import {resourceBasePath} from "../../../../resource/resource-base-path";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Observable, Subject} from "rxjs";

/** イベント通知 */
type Notifier = {
  gameStart: Observable<void>,
  howToPlay: Observable<void>,
};

/** コンストラクタのパラメータ */
type Params = {
  /** バインド先のHTML要素 */
  dom: HTMLElement,
  /** 初期状態 */
  initialState: TitleState,
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

    const rootId = domUuid();
    const gameStartId = domUuid();
    const howToPlayId = domUuid();
    params.dom.innerHTML = `
      <div class="title" id="${rootId}">
        <img class="title__logo" src="${resourceBasePath()}/logo.png"/>
        <div class="title__copy-right">(C) 2020 Yuusuke Takeuchi</div>
        <div class="title__buttons">
          <button class="title__buttons__game-start" id="${gameStartId}" >ゲームスタート</button>
          <button class="title__buttons__how-to-play" id="${howToPlayId}">遊び方</button>
        </div>
      </div>
    `;

    this._root = document.getElementById(rootId) || document.createElement('div');

    this._gameStart = document.getElementById(gameStartId) || document.createElement('div');
    this._gameStart.addEventListener('click', () => {
      this._gameStartStream.next();
    });
    this._gameStart.addEventListener('touchstart', () => {
      this._gameStartStream.next();
    });

    this._howToPlay = document.getElementById(howToPlayId) || document.createElement('div');
    this._howToPlay.addEventListener('click', () => {
      this._howToPlayStream.next();
    });
    this._howToPlay.addEventListener('touchstart', () => {
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
}