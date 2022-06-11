// @flow
import type {InProgress} from "./in-progress/in-progress";
import type {GbraverBurstBrowserConfigRepository} from "./config/browser-config";
import {FutureSuddenlyBattleEnd} from "./future-suddenly-battle-end";
import type {Stream, Unsubscriber} from "../stream/stream";
import type {Resize} from "../window/resize";
import {CssVH} from "../view-port/vh";
import {DOMFader} from "../components/dom-fader/dom-fader";
import {InterruptScenes} from "./innterrupt-scenes";
import {DOMScenes} from "./dom-scenes";
import {DOMDialogs} from "./dom-dialogs";
import {DOMFloaters} from "./dom-floaters/dom-floaters";
import {TDScenes} from "./td-scenes";
import type {ResourceRoot} from "../resource/resource-root";
import type {Resources} from "../resource";
import type {BGMManager} from "../bgm/bgm-manager";
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
import {emptyResources} from "../resource";
import {resizeStream} from "../window/resize";
import {createBGMManager} from "../bgm/bgm-manager";

/** ゲーム管理オブジェクトで利用するAPIサーバの機能 */
export interface GameAPI extends UniversalLogin, LoginCheck, CasualMatchSDK, Logout, LoggedInUserDelete,
  UserNameGet, UserPictureGet, MailVerify, UserMailGet, WebsocketDisconnect,
  WebsocketErrorNotifier, WebsocketUnintentionalCloseNotifier {}

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps {
  isPerformanceStatsVisible: boolean;
  isServiceWorkerUsed: boolean;
  howToPlayMovieURL: string;
  termsOfServiceURL: string;
  privacyPolicyURL: string;
  contactURL: string;
  isAPIServerEnable: boolean;
  inProgress: InProgress;
  api: GameAPI;
  config: GbraverBurstBrowserConfigRepository;
  suddenlyBattleEnd: FutureSuddenlyBattleEnd;
  resize: Stream<Resize>;
  vh: CssVH;
  fader: DOMFader;
  interruptScenes: InterruptScenes;
  domScenes: DOMScenes;
  domDialogs: DOMDialogs;
  domFloaters: DOMFloaters;
  tdScenes: TDScenes;
  resourceRoot: ResourceRoot;
  resources: Resources;
  isFullResourceLoaded: boolean;
  serviceWorker: ?ServiceWorkerRegistration;
  bgm: BGMManager;
  unsubscriber: Unsubscriber[];
}

/** GamePropsジェネレータパラメータ */
type Param = {
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
export function createGameProps(param: Param): GameProps {
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
    unsubscriber: []
  };
}