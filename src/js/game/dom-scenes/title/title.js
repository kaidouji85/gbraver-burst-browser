// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import {pop} from "../../../dom/animation/pop";
import {Howl} from "howler";
import {SOUND_IDS} from "../../../resource/sound";
import {Exclusive} from "../../../exclusive/exclusive";
import type {DOMScene} from "../dom-scene";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";

/**
 * タイトル
 */
export class Title implements DOMScene {
  _exclusive: Exclusive;
  _root: HTMLElement;
  _gameStart: HTMLElement;
  _howToPlay: HTMLElement;
  _isTitleBackLoaded: Promise<void>;
  _isLogoLoaded: Promise<void>;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _pushGameStart: StreamSource<void>;
  _pushHowToPlay: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._exclusive = new Exclusive();

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
          <button class="title__contents__controllers__how-to-play" data-id="${howToPlayId}">遊び方</button>
          <button class="title__contents__controllers__game-start" data-id="${gameStartId}" >ゲームスタート</button>
        </div>
      </div>
    `;
    this._root.className = 'title';
    const titleBackImage = new Image();
    this._isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
      this._root.style.backgroundImage = `url(${titleBackImage.src})`;
    });
    titleBackImage.src = resources.paths.find(v => v.id === PathIds.TITLE_BACK)
      ?.path ?? '';

    const logo = this._root.querySelector(`[data-id="${logoId}"]`);
    const logoImage: HTMLImageElement = (logo instanceof HTMLImageElement) ? logo : new Image();
    this._isLogoLoaded = waitElementLoaded(logoImage);
    logoImage.src = resources.paths.find(v => v.id === PathIds.LOGO)
      ?.path ?? '';

    this._pushButton = this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();

    this._gameStart = this._root.querySelector(`[data-id="${gameStartId}"]`) || document.createElement('div');
    this._howToPlay = this._root.querySelector(`[data-id="${howToPlayId}"]`) || document.createElement('div');

    this._pushGameStart = new RxjsStreamSource();
    this._pushHowToPlay = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._gameStart).subscribe(() => {
        this._onPushGameStart();
      }),
      pushDOMStream(this._howToPlay).subscribe(() => {
        this._onPushHowToPlay()
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ゲームスタートボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushGameStartNotifier(): Stream<void> {
    return this._pushGameStart;
  }

  /**
   * 遊び方ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushHowToPlayNotifier(): Stream<void> {
    return this._pushHowToPlay;
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
   * ゲームスタートが押された際の処理
   */
  _onPushGameStart(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._pushButton.play();
      await pop(this._gameStart);
      this._pushGameStart.next();
    });
  }

  /**
   * 遊び方が押された際の処理
   */
  _onPushHowToPlay(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValue.play();
      await pop(this._howToPlay);
      this._pushHowToPlay.next();
    });
  }
}