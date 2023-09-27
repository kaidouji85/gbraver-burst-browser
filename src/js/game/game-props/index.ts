import {BrowserSDK} from "@gbraver-burst-network/browser-sdk";
import {Observable} from "rxjs";

import type {BGMManager} from "../../bgm/bgm-manager";
import {DOMFader} from "../../components/dom-fader/dom-fader";
import {CssHUDUIScale} from "../../css/hud-ui-scale";
import {CssVH} from "../../css/vh";
import type {GameLoop} from "../../game-loop/game-loop";
import {Renderer} from "../../render";
import type {Resources} from "../../resource";
import type {ResourceRoot} from "../../resource/resource-root";
import {VisibilityChange,} from "../../visibility-change/visibility-change";
import type {PushWindow} from "../../window/push-window";
import type {Resize} from "../../window/resize";
import {GBraverBurstBrowserConfigRepository} from "../config/repository/repository";
import {DOMDialogBinder} from "../dom-dialog-binder";
import {DOMFloaters} from "../dom-floaters/dom-floaters";
import {DOMSceneBinder} from "../dom-scene-binder";
import {FutureSuddenlyBattleEnd} from "../future-suddenly-battle-end";
import type {InProgress} from "../in-progress/in-progress";
import {InterruptScenes} from "../innterrupt-scenes";
import {TDSceneBinder} from "../td-scene-binder";

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps {
  /** FPS統計を表示するか否か、trueで表示する */
  isPerformanceStatsVisible: boolean;
  /** サービスワーカーを利用するか否か、trueで利用する */
  isServiceWorkerUsed: boolean;
  /** 遊び方スライドのURL */
  howToPlayURL: string;
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
  /** APIサーバのSDK */
  api: BrowserSDK;
  /** ブラウザ設定リポジトリ */
  config: GBraverBurstBrowserConfigRepository;
  /** バトル強制終了監視 */
  suddenlyBattleEnd: FutureSuddenlyBattleEnd;
  /** リサイズ */
  resize: Observable<Resize>;
  /** window押下 */
  pushWindow: Observable<PushWindow>;
  /** ゲームループ */
  gameLoop: Observable<GameLoop>;
  /** VisibilityChange */
  visibilityChange: Observable<VisibilityChange>;
  /** cssカスタムプロパティ --vh */
  vh: CssVH;
  /** cssカスタムプロパティ --hud-ui-scale */
  hudUIScale: CssHUDUIScale;
  /** DOMフェーダ */
  fader: DOMFader;
  /** 強制割込シーン管理オブジェクト */
  interruptScenes: InterruptScenes;
  /** DOMシーンバインダー */
  domSceneBinder: DOMSceneBinder;
  /** DOMダイアログバインダー */
  domDialogBinder: DOMDialogBinder;
  /** DOMフローター管理オブジェクト */
  domFloaters: DOMFloaters;
  /** レンダラ管理オブジェクト */
  renderer: Renderer;
  /** 3Dシーンバインダー */
  tdBinder: TDSceneBinder;
  /** リソースルート */
  resourceRoot: ResourceRoot;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 全リソースを読み込んだか否かのフラグ、trueで全リソースを読み込んだ */
  isFullResourceLoaded: boolean;
  /** ServiceWorkerRegistrationのキャッシュ */
  serviceWorker: ServiceWorkerRegistration | null | undefined;
  /** BGM管理オブジェクト */
  bgm: BGMManager;
  /** 開発中のチュートリアルをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayTutorialInDevelopment: boolean;
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  shouldLoadDevelopingResource: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingPilot: boolean;
}
