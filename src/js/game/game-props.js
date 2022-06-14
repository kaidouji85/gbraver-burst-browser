// @flow
import type {
  CasualMatch as CasualMatchSDK,
  LoggedInUserDelete,
  LoginCheck,
  Logout,
  MailVerify,
  UniversalLogin,
  UserMailGet,
  UserNameGet,
  UserPictureGet,
  WebsocketDisconnect,
  WebsocketErrorNotifier,
  WebsocketUnintentionalCloseNotifier
} from "@gbraver-burst-network/browser-core";
import type {BGMManager} from "../bgm/bgm-manager";
import {createBGMManager} from "../bgm/bgm-manager";
import {DOMFader} from "../components/dom-fader/dom-fader";
import type {Resources} from "../resource";
import {emptyResources} from "../resource";
import type {ResourceRoot} from "../resource/resource-root";
import type {Stream} from "../stream/stream";
import {CssVH} from "../view-port/vh";
import type {Resize} from "../window/resize";
import {resizeStream} from "../window/resize";
import type {GbraverBurstBrowserConfigRepository} from "./config/browser-config";
import {DOMDialogs} from "./dom-dialogs";
import {DOMFloaters} from "./dom-floaters/dom-floaters";
import {DOMScenes} from "./dom-scenes";
import {FutureSuddenlyBattleEnd} from "./future-suddenly-battle-end";
import type {InProgress} from "./in-progress/in-progress";
import {InterruptScenes} from "./innterrupt-scenes";
import {TDScenes} from "./td-scenes";

/** ゲーム管理オブジェクトで利用するAPIサーバの機能 */
export interface GameAPI extends UniversalLogin, LoginCheck, CasualMatchSDK, Logout, LoggedInUserDelete,
  UserNameGet, UserPictureGet, MailVerify, UserMailGet, WebsocketDisconnect,
  WebsocketErrorNotifier, WebsocketUnintentionalCloseNotifier {}

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps {
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean;
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** 遊び方動画のURL */
  howToPlayMovieURL: string;
  /** 利用規約ページのURL */
  termsOfServiceURL: string;
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;
  /** 問い合わせページのURL */
  contactURL: string;
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean;
  /** 現在進行中のフロー */
  inProgress: InProgress;
  /** ゲームで利用するAPI */
  api: GameAPI;
  /** ブラウザ設定リポジトリ */
  config: GbraverBurstBrowserConfigRepository;
  /** バトル強制終了監視 */
  suddenlyBattleEnd: FutureSuddenlyBattleEnd;
  /** リサイズ */
  resize: Stream<Resize>;
  /** cssカスタムプロパティ --vh */
  vh: CssVH;
  /** DOMフェーダ */
  fader: DOMFader;
  /** 強制割込シーン管理オブジェクト */
  interruptScenes: InterruptScenes;
  /** DOMシーン管理オブジェクト */
  domScenes: DOMScenes;
  /** DOMダイアログ管理オブジェクト */
  domDialogs: DOMDialogs;
  /** DOMフローター管理オブジェクト */
  domFloaters: DOMFloaters;
  /** 3Dシーン管理オブジェクト */
  tdScenes: TDScenes;
  /** リソースルート */
  resourceRoot: ResourceRoot;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 全リソースを読み込んだか否かのフラグ、trueで全リソースを読み込んだ */
  isFullResourceLoaded: boolean;
  /** ServiceWorkerRegistrationのキャッシュ */
  serviceWorker: ?ServiceWorkerRegistration;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
}

/** GamePropsジェネレータパラメータ */
export type GamePropsGeneratorParam = {
  /** リソースルート */
  resourceRoot: ResourceRoot,
  /** 遊び方動画のURL */
  howToPlayMovieURL: string,
  /** 利用規約ページのURL */
  termsOfServiceURL: string,
  /** 問い合わせページのURL */
  contactURL: string,
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string,
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean,
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean,
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  isAPIServerEnable: boolean,
  /** APIサーバのSDK */
  api: GameAPI,
  /** ブラウザ設定リポジトリ */
  config: GbraverBurstBrowserConfigRepository
};

/**
 * ゲームプロパティを生成する
 *
 * @param param パラメータ
 * @return 生成結果
 */
export function generateGameProps(param: GamePropsGeneratorParam): GameProps {
  const resize = resizeStream()
  return {
    resourceRoot: param.resourceRoot,
    resources: emptyResources(param.resourceRoot),
    isFullResourceLoaded: false,
    isServiceWorkerUsed: param.isServiceWorkerUsed,
    isPerformanceStatsVisible: param.isPerformanceStatsVisible,
    howToPlayMovieURL: param.howToPlayMovieURL,
    termsOfServiceURL: param.termsOfServiceURL,
    privacyPolicyURL: param.privacyPolicyURL,
    contactURL: param.contactURL,
    isAPIServerEnable: param.isAPIServerEnable,
    inProgress: {type: 'None'},
    resize,
    vh: new CssVH(resize),
    api: param.api,
    config: param.config,
    suddenlyBattleEnd: new FutureSuddenlyBattleEnd(),
    fader: new DOMFader(),
    interruptScenes: new InterruptScenes(),
    domScenes: new DOMScenes(),
    domDialogs: new DOMDialogs(),
    domFloaters: new DOMFloaters(),
    tdScenes: new TDScenes(resize),
    serviceWorker: null,
    bgm: createBGMManager(),
  };
}