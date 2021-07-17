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

/** ルート要素のcssクラス名 */
const ROOT_CLASS_NAME = 'title';

/** data-idを集めたもの */
type DataIDs = {
  logo: string,
  gameStart: string,
  casualMatch: string,
  howToPlay: string,
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param canCasualMatch カジュアルマッチが可能か否か、trueで可能
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, canCasualMatch: boolean): string {
  const visibleCasualMatch = `${ROOT_CLASS_NAME}__contents__controllers__casual-match`;
  const invisibleCasualMatch = `${visibleCasualMatch}--invisible`
  const casualMatchClassName = canCasualMatch ? visibleCasualMatch: invisibleCasualMatch
  return `
    <div class="${ROOT_CLASS_NAME}__contents">
    <img class="${ROOT_CLASS_NAME}__contents__logo" data-id="${ids.logo}">
    <div class="${ROOT_CLASS_NAME}__contents__copy-rights">
      <span class="${ROOT_CLASS_NAME}__contents__copy-rights__row">(C) 2020 Yuusuke Takeuchi</span>
      </div>
      <div class="${ROOT_CLASS_NAME}__contents__controllers">
        <button class="${ROOT_CLASS_NAME}__contents__controllers__how-to-play" data-id="${ids.howToPlay}">遊び方</button>
        <button class="${ROOT_CLASS_NAME}__contents__controllers__game-start" data-id="${ids.gameStart}">ゲームスタート</button>
        <button class="${casualMatchClassName}" data-id="${ids.casualMatch}">ネット対戦</button>
      </div>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  logo: HTMLImageElement,
  gameStart: HTMLElement,
  casualMatch: HTMLElement,
  howToPlay: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 * 
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo = (logoElement instanceof HTMLImageElement) ? logoElement : new Image();
  const gameStart = root.querySelector(`[data-id="${ids.gameStart}"]`) ?? document.createElement('div');
  const casualMatch = root.querySelector(`[data-id="${ids.casualMatch}"]`) ?? document.createElement('div');
  const howToPlay = root.querySelector(`[data-id="${ids.howToPlay}"]`) ?? document.createElement('div');
  return {logo, gameStart, casualMatch, howToPlay};
}

/** タイトル */
export class Title implements DOMScene {
  _exclusive: Exclusive;
  _root: HTMLElement;
  _gameStart: HTMLElement;
  _casualMatch: HTMLElement;
  _howToPlay: HTMLElement;
  _isTitleBackLoaded: Promise<void>;
  _isLogoLoaded: Promise<void>;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _pushGameStart: StreamSource<void>;
  _pushCasualMatch: StreamSource<void>;
  _pushHowToPlay: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param canCasualMatch カジュアルマッチが可能か否か、trueで可能である
   */
  constructor(resources: Resources, canCasualMatch: boolean) {
    this._exclusive = new Exclusive();

    const dataIDs = {logo: domUuid(), gameStart: domUuid(), casualMatch: domUuid(), howToPlay: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(dataIDs, canCasualMatch);
    this._root.className = ROOT_CLASS_NAME;
    const elements = extractElements(this._root, dataIDs);

    this._isLogoLoaded = waitElementLoaded(elements.logo);
    elements.logo.src = resources.paths.find(v => v.id === PathIds.LOGO)
      ?.path ?? '';

    this._gameStart = elements.gameStart;
    this._casualMatch = elements.casualMatch;
    this._howToPlay = elements.howToPlay;

    const titleBackImage = new Image();
    this._isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
      this._root.style.backgroundImage = `url(${titleBackImage.src})`;
    });
    titleBackImage.src = resources.paths.find(v => v.id === PathIds.TITLE_BACK)
      ?.path ?? '';

    this._pushButton = this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();

    this._pushGameStart = new RxjsStreamSource();
    this._pushHowToPlay = new RxjsStreamSource();
    this._pushCasualMatch = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._gameStart).subscribe(() => {
        this._onPushGameStart();
      }),
      pushDOMStream(this._casualMatch).subscribe(() => {
        this._onCasualMatchPush();
      }),
      pushDOMStream(this._howToPlay).subscribe(() => {
        this._onPushHowToPlay();
      }),
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
   * カジュアルマッチボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushCasualMatchNotifier(): Stream<void> {
    return this._pushCasualMatch;
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
   * カジュアルマッチが押された時の処理
   * @private
   */
  _onCasualMatchPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._pushButton.play();
      await pop(this._casualMatch);
      this._pushCasualMatch.next();
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