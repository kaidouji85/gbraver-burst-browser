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