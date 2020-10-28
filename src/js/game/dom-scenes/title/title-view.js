// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {Observable} from "rxjs";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import type {PushDOM} from "../../../action/push/push-dom";
import {pushDOMStream} from "../../../action/push/push-dom";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import {pop} from "../../../dom/animation/pop";

/** イベント通知 */
type Notifier = {
  gameStart: Observable<PushDOM>,
  howToPlay: Observable<PushDOM>,
};

/** タイトルビュー */
export class TitlePresentation {
  _gameStartStream: Observable<PushDOM>;
  _howToPlayStream: Observable<PushDOM>;

  _root: HTMLElement;
  _gameStart: HTMLElement;
  _howToPlay: HTMLElement;

  _isTitleBackLoaded: Promise<void>;
  _isLogoLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const logoId = domUuid();
    const gameStartId = domUuid();
    const howToPlayId = domUuid();
    this._root = document.createElement('div');
    this._root.innerHTML = `
      <div class="title__contents">
        <img class="title__contents__logo" data-id="${logoId}" />
        <div class="title__contents__copy-rights">
          <span class="title__contents__copy-rights__row">(C) 2020 Yuusuke Takeuchi</span>
        </div>
        <div class="title__contents__controllers">
          <button class="title__contents__controllers__game-start" data-id="${gameStartId}" >ゲームスタート</button>
          <button class="title__contents__controllers__how-to-play" data-id="${howToPlayId}">遊び方</button>
        </div>
      </div>
    `;
    this._root.className = 'title';
    const titleBackImage = new Image();
    this._isTitleBackLoaded = waitElementLoaded(titleBackImage)
      .then(() => {
        this._root.style.backgroundImage = `url(${titleBackImage.src})`;
      });
    titleBackImage.src = resources.paths.find(v => v.id === PathIds.TITLE_BACK)
      ?.path ?? '';

    const logo = this._root.querySelector(`[data-id="${logoId}"]`);
    const logoImage: HTMLImageElement = (logo instanceof HTMLImageElement)
      ? logo
      : new Image();
    this._isLogoLoaded = waitElementLoaded(logoImage);
    logoImage.src = resources.paths.find(v => v.id === PathIds.LOGO)
      ?.path ?? '';

    this._gameStart = this._root.querySelector(`[data-id="${gameStartId}"]`) || document.createElement('div');
    this._gameStartStream = pushDOMStream(this._gameStart);

    this._howToPlay = this._root.querySelector(`[data-id="${howToPlayId}"]`) || document.createElement('div');
    this._howToPlayStream = pushDOMStream(this._howToPlay);
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

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this._isTitleBackLoaded,
      this._isLogoLoaded,
    ]);
  }

  /**
   * ゲームスタートボタンを押した際のアニメーション
   *
   * @return アニメーション
   */
  async pushGameStartButton(): Promise<void> {
    await pop(this._gameStart);
  }

  /**
   * 遊び方ボタンを押した際のアニメーション
   *
   * @return アニメーション
   */
  async pushHowToPlayButton(): Promise<void> {
    await pop(this._howToPlay);
  }
}