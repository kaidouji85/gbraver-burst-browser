import { Observable } from "rxjs";

import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { PerformanceStats } from "../../dom/stats/performance-stats";
import { PushWindow } from "../../dom/window/push-window";
import { Resize } from "../../dom/window/resize";
import { AbortManagerContainer } from "../../event/abort-controller/abort-manager-container";
import { ResourcesContainer } from "../../resource";
import { ResourceRoot } from "../../resource/resource-root";
import { BGMManagerContainer } from "../../sounds/bgm/bgm-manager";
import { SEPlayerContainer } from "../../sounds/se/se-player";
import { Renderer } from "../../web-gl/render";
import { GBraverBurstBrowserConfigRepository } from "../config/repository/repository";
import { DOMDialogBinder } from "../dialogs/dom-dialog-binder";
import { PostBattleFloater } from "../floaters/post-battle";
import { DOMFader } from "../game-dom/dom-fader/dom-fader";
import { GameLoopContainer } from "../game-loop/game-loop-container";
import { InProgress } from "../in-progress";
import { NetworkContext } from "../network-context";
import { DOMSceneBinderContainer } from "../scenes/dom-scenes/dom-scene-binder/dom-scene-binder-container";
import { InterruptScenes } from "../scenes/innterrupt-scenes";
import { TDSceneBinder } from "../scenes/td-scenes/td-scene-binder";
import { SharedResourceState } from "../shared-resource-state";
import { SuddenlyBattleEnd } from "../suddenly-battle-end";
import { GameActionManageContainer } from "./game-action-manage-container";

/**
 * ゲームプロパティ
 * 本オブジェクトはゲーム管理オブジェクト内部、各種ヘルパーで利用することを想定している
 */
export interface GameProps
  extends
    BGMManagerContainer,
    ResourcesContainer,
    SEPlayerContainer,
    GameActionManageContainer,
    Readonly<GameLoopContainer>,
    Readonly<AbortManagerContainer>,
    Readonly<DOMSceneBinderContainer> {
  /** サービスワーカーを利用するか否か、trueで利用する */
  readonly isServiceWorkerUsed: boolean;
  /** 開発中のエピソードをプレイできるか否かのフラグ、trueでプレイできる */
  readonly canPlayEpisodeInDevelopment: boolean;
  /** 開発中のアームドーザを選択できるか否かのフラグ、trueで選択できる */
  readonly canPlayDevelopingArmdozer: boolean;
  /** 開発中のパイロットを選択できるか否かのフラグ、trueで選択できる */
  readonly canPlayDevelopingPilot: boolean;
  /** タイトルヘルプアイコンを表示するか否かのフラグ、trueで表示する */
  readonly isTitleHelpIconEnable: boolean;

  /** 遊び方スライドのURL */
  readonly howToPlayURL: string;
  /** ロボ、パイロット説明スライドのURL */
  readonly characterDescriptionURL: string;
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

  /** ネットワークコンテキスト */
  readonly networkContext: NetworkContext;
  /** バトル強制終了監視 */
  readonly suddenlyBattleEnd: SuddenlyBattleEnd;

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
  /** DOMダイアログバインダー */
  readonly domDialogBinder: DOMDialogBinder;
  /** ポストバトルフローター */
  readonly postBattle: PostBattleFloater;

  /** レンダラ管理オブジェクト */
  readonly renderer: Renderer;
  /** 3Dシーンバインダー */
  readonly tdSceneBinder: TDSceneBinder;

  /** リソースルート */
  readonly resourceRoot: ResourceRoot;
  /** Sharedリソースのステート */
  sharedResourceState: SharedResourceState;
}
