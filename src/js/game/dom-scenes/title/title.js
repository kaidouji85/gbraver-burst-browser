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
  login: string,
  logout: string,
  logo: string,
  gameStart: string,
  casualMatch: string,
  howToPlay: string,
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param isLogin ログインしているか否かのフラグ、trueでログインしている
 * @param isApiServerEnable APIサーバが利用可能か否か、trueで利用可能である
 * @param termsOfServiceURL 利用規約ページのURL
 * @param privacyPolicyURL プライバシーポリシーページのURL
 * @param contactURL 問い合わせページのURL
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, isLogin: boolean, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string): string {
  const visibleLogin = `${ROOT_CLASS_NAME}__login`;
  const invisibleLogin = `${visibleLogin}--invisible`;
  const loginClassName = (isApiServerEnable && !isLogin) ?  visibleLogin : invisibleLogin;
  const visibleLogout = `${ROOT_CLASS_NAME}__logout`;
  const invisibleLogout = `${visibleLogout}--invisible`;
  const logoutClassName = (isApiServerEnable && isLogin) ? visibleLogout : invisibleLogout;
  const visibleCasualMatch = `${ROOT_CLASS_NAME}__contents__controllers__casual-match`;
  const invisibleCasualMatch = `${visibleCasualMatch}--invisible`
  const casualMatchClassName = isApiServerEnable ? visibleCasualMatch: invisibleCasualMatch;
  return `
    <button data-id="${ids.login}" class="${loginClassName}">ログイン</button>
    <button data-id="${ids.logout}" class="${logoutClassName}">ログアウト</button>
    <div class="${ROOT_CLASS_NAME}__contents">
      <img class="${ROOT_CLASS_NAME}__contents__logo" data-id="${ids.logo}">
      <div class="${ROOT_CLASS_NAME}__contents__controllers">
        <button class="${ROOT_CLASS_NAME}__contents__controllers__how-to-play" data-id="${ids.howToPlay}">遊び方</button>
        <button class="${ROOT_CLASS_NAME}__contents__controllers__game-start" data-id="${ids.gameStart}">ゲームスタート</button>
        <button class="${casualMatchClassName}" data-id="${ids.casualMatch}">ネット対戦</button>
      </div>
    </div>
    <div class="${ROOT_CLASS_NAME}__footer">
      <span class="${ROOT_CLASS_NAME}__footer__copy-rights">(C) 2020 Yuusuke Takeuchi</span>
      <a class="${ROOT_CLASS_NAME}__footer__terms-of-service" href="${termsOfServiceURL}" target="_blank" rel="noopener">利用規約</a>
      <a class="${ROOT_CLASS_NAME}__footer__privacy-policy" href="${privacyPolicyURL}" target="_blank" rel="noopener">プライバシーポリシー</a>
      <a class="${ROOT_CLASS_NAME}__footer__contact" href="${contactURL}" target="_blank" rel="noopener">問い合わせ</a>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  login: HTMLElement,
  logout: HTMLElement,
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
  const login = root.querySelector(`[data-id="${ids.login}"]`) ?? document.createElement('div');
  const logout = root.querySelector(`[data-id="${ids.logout}"]`) ?? document.createElement('div');
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo = (logoElement instanceof HTMLImageElement) ? logoElement : new Image();
  const gameStart = root.querySelector(`[data-id="${ids.gameStart}"]`) ?? document.createElement('div');
  const casualMatch = root.querySelector(`[data-id="${ids.casualMatch}"]`) ?? document.createElement('div');
  const howToPlay = root.querySelector(`[data-id="${ids.howToPlay}"]`) ?? document.createElement('div');
  return {login, logout, logo, gameStart, casualMatch, howToPlay};
}

/** タイトル */
export class Title implements DOMScene {
  _exclusive: Exclusive;
  _login: HTMLElement;
  _logout: HTMLElement;
  _root: HTMLElement;
  _gameStart: HTMLElement;
  _casualMatch: HTMLElement;
  _howToPlay: HTMLElement;
  _isTitleBackLoaded: Promise<void>;
  _isLogoLoaded: Promise<void>;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _pushLogin: StreamSource<void>;
  _pushLogout: StreamSource<void>;
  _pushGameStart: StreamSource<void>;
  _pushCasualMatch: StreamSource<void>;
  _pushHowToPlay: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param isLogin ログインしているか否か、trueでログインしている
   * @param isApiServerEnable APIサーバが利用可能か否か、trueで利用可能である
   * @param termsOfServiceURL 利用規約ページのURL
   * @param privacyPolicyURL プライバシーポリシーページのURL
   * @param contactURL 問い合わせページのURL
   */
  constructor(resources: Resources, isLogin: boolean, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string) {
    this._exclusive = new Exclusive();
    const dataIDs = {login: domUuid(), logout: domUuid(), logo: domUuid(), gameStart: domUuid(), 
      casualMatch: domUuid(), howToPlay: domUuid(),termsOfService: domUuid(), privacyPolicy: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(dataIDs, isLogin, isApiServerEnable, termsOfServiceURL, privacyPolicyURL, contactURL);
    this._root.className = ROOT_CLASS_NAME;
    const elements = extractElements(this._root, dataIDs);

    this._isLogoLoaded = waitElementLoaded(elements.logo);
    elements.logo.src = resources.paths.find(v => v.id === PathIds.LOGO)
      ?.path ?? '';

    this._login = elements.login;
    this._logout = elements.logout;
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

    this._pushLogin = new RxjsStreamSource();
    this._pushLogout = new RxjsStreamSource();
    this._pushGameStart = new RxjsStreamSource();
    this._pushHowToPlay = new RxjsStreamSource();
    this._pushCasualMatch = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._login).subscribe(() => {
        this._onLoginPush();
      }),
      pushDOMStream(this._logout).subscribe(() => {
        this._onLogoutPush();
      }),
      pushDOMStream(this._gameStart).subscribe(() => {
        this._onGameStartPush();
      }),
      pushDOMStream(this._casualMatch).subscribe(() => {
        this._onCasualMatchPush();
      }),
      pushDOMStream(this._howToPlay).subscribe(() => {
        this._onHowToPlayPush();
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
   * ログインボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLoginNotifier(): Stream<void> {
    return this._pushLogin;
  }

  /**
   * ログアウトボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLogoutNotifier(): Stream<void> {
    return this._pushLogout;
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
  _onGameStartPush(): void {
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
  _onHowToPlayPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValue.play();
      await pop(this._howToPlay);
      this._pushHowToPlay.next();
    });
  }

  /**
   * ログインが押された際の処理
   */
  _onLoginPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._pushButton.play();
      await pop(this._login);
      this._pushLogin.next();
    });
  }

  /**
   * ログアウトが押された際の処理
   */
  _onLogoutPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValue.play();
      await pop(this._logout);
      this._pushLogout.next();
    });
  }
}