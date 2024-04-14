import { BrowserSDK } from "@gbraver-burst-network/browser-sdk";
import { Observable } from "rxjs";

import { BGMManager } from "../../bgm/bgm-manager";
import { DOMFader } from "../../components/dom-fader/dom-fader";
import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { GameLoop } from "../../game-loop/game-loop";
import { Renderer } from "../../render";
import { Resources } from "../../resource";
import { ResourceRoot } from "../../resource/resource-root";
import { SEPlayer } from "../../se/se-player";
import { PerformanceStats } from "../../stats/performance-stats";
import { PushWindow } from "../../window/push-window";
import { Resize } from "../../window/resize";
import { GBraverBurstBrowserConfigRepository } from "../config/repository/repository";
import { DOMDialogBinder } from "../dom-dialog-binder";
import { DOMFloaters } from "../dom-floaters/dom-floaters";
import { DOMSceneBinder } from "../dom-scene-binder";
import { FutureSuddenlyBattleEnd } from "../future-suddenly-battle-end";
import { InProgress } from "../in-progress/in-progress";
import { InterruptScenes } from "../innterrupt-scenes";
import { TDSceneBinder } from "../td-scene-binder";

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps {
  /** パフォーマンス統計、表示されていない場合はnullが入る */
  performanceStats: PerformanceStats | null;
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
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** 開発中のエピソードをプレイできるか否かのフラグ、trueでプレイできる */
  canPlayEpisodeInDevelopment: boolean;
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  shouldLoadDevelopingResource: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  canPlayDevelopingPilot: boolean;
}
