import { BrowserSDK } from "@gbraver-burst-network/browser-sdk";
import { Observable } from "rxjs";

import { BGMManagerContainer } from "../../bgm/bgm-manager";
import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { DOMDialogBinder } from "../../dom-dialogs/dom-dialog-binder";
import { DOMFloaters } from "../../dom-floaters";
import { DOMSceneBinder } from "../../dom-scenes/dom-scene-binder";
import { DOMFader } from "../../game-dom/dom-fader/dom-fader";
import { GameLoopContainer } from "../../game-loop/game-loop-container";
import { Renderer } from "../../render";
import { ResourcesContainer } from "../../resource";
import { ResourceRoot } from "../../resource/resource-root";
import { SEPlayerContainer } from "../../se/se-player";
import { PerformanceStats } from "../../stats/performance-stats";
import { TDSceneBinder } from "../../td-scenes/td-scene-binder";
import { PushWindow } from "../../window/push-window";
import { Resize } from "../../window/resize";
import { GBraverBurstBrowserConfigRepository } from "../config/repository/repository";
import { FutureSuddenlyBattleEnd } from "../future-suddenly-battle-end";
import { InProgress } from "../in-progress";
import { InterruptScenes } from "../innterrupt-scenes";
import { GameActionManageContainer } from "./game-action-manage-container";

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps
  extends BGMManagerContainer,
    ResourcesContainer,
    SEPlayerContainer,
    GameActionManageContainer,
    Readonly<GameLoopContainer> {
  /** サービスワーカーを利用するか否か、trueで利用する */
  readonly isServiceWorkerUsed: boolean;
  /** APIサーバ系機能が利用可能か否か、trueで利用可能 */
  readonly isAPIServerEnable: boolean;
  /** 開発中のエピソードをプレイできるか否かのフラグ、trueでプレイできる */
  readonly canPlayEpisodeInDevelopment: boolean;
  /** 開発中のリソースをロードするか否かのフラグ、trueでロードする */
  readonly shouldLoadDevelopingResource: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  readonly canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  readonly canPlayDevelopingPilot: boolean;

  /** 遊び方スライドのURL */
  readonly howToPlayURL: string;
  /** ロボ、パイロット説明スライドのURL */
  characterDescriptionURL: string;
  /** 利用規約ページのURL */
  readonly termsOfServiceURL: string;
  /** プライバシーポリシーページのURL */
  readonly privacyPolicyURL: string;
  /** 問い合わせページのURL */
  readonly contactURL: string;

  /** パフォーマンス統計、表示されていない場合はnullが入る */
  performanceStats: PerformanceStats | null;
  /** ServiceWorkerRegistrationのキャッシュ */
  serviceWorker: ServiceWorkerRegistration | null;

  /** ブラウザ設定リポジトリ */
  readonly config: GBraverBurstBrowserConfigRepository;

  /** 現在進行中のフロー */
  inProgress: InProgress;

  /** APIサーバのSDK */
  readonly api: BrowserSDK;
  /** バトル強制終了監視 */
  readonly suddenlyBattleEnd: FutureSuddenlyBattleEnd;

  /** リサイズ */
  readonly resize: Observable<Resize>;
  /** window押下 */
  readonly pushWindow: Observable<PushWindow>;

  /** cssカスタムプロパティ --hud-ui-scale */
  readonly hudUIScale: CssHUDUIScale;

  /** DOMフェーダ */
  readonly fader: DOMFader;
  /** 強制割込シーン管理オブジェクト */
  readonly interruptScenes: InterruptScenes;
  /** DOMシーンバインダー */
  readonly domSceneBinder: DOMSceneBinder;
  /** DOMダイアログバインダー */
  readonly domDialogBinder: DOMDialogBinder;
  /** DOMフローター管理オブジェクト */
  readonly domFloaters: DOMFloaters;

  /** レンダラ管理オブジェクト */
  readonly renderer: Renderer;
  /** 3Dシーンバインダー */
  readonly tdSceneBinder: TDSceneBinder;

  /** リソースルート */
  readonly resourceRoot: ResourceRoot;
  /** 全リソースを読み込んだか否かのフラグ、trueで全リソースを読み込んだ */
  isFullResourceLoaded: boolean;
}
