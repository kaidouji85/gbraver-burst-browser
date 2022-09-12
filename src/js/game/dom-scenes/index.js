// @flow
import type {ArmDozerId} from "gbraver-burst-core";
import type {BGMManager} from '../../bgm/bgm-manager';
import type {Resources} from "../../resource";
import type {LoadingActions} from "../../resource/loading-actions";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/stream";
import {createStreamSource} from "../../stream/stream";
import {waitTime} from "../../wait/wait-time";
import type {GbraverBurstBrowserConfig} from "../config/browser-config";
import type {GameAction} from "../game-actions";
import {Config} from "./config/config";
import type {DOMScene} from "./dom-scene";
import {Loading} from "./loading";
import {MailVerifiedIncomplete} from "./mail-verified-incomplete/mail-verified-incomplete";
import {MatchCard} from "./match-card";
import {NPCEnding} from "./npc-ending/npc-ending";
import {PlayerSelect} from "./player-select";
import type {StageTitleParam} from "./stage-title/stage-title";
import {StageTitle} from "./stage-title/stage-title";
import type {TitleParams} from "./title/title";
import {Title} from "./title/title";
import type {TutorialStage} from "./tutorial-selector/tutoria-stage-element";
import {TutorialSelector} from "./tutorial-selector/tutorial-selector";

/**
 * 最大読み込み待機時間(ミリ秒)
 */
const MAX_LOADING_TIME = 10000;

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  #root: HTMLElement;
  #scene: ?DOMScene;
  #gameAction: StreamSource<GameAction>;
  #unsubscribers: Unsubscriber[];

  constructor() {
    this.#root = document.createElement('div');
    this.#gameAction = createStreamSource();
    this.#scene = null;
    this.#unsubscribers = [];
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this.#removeCurrentScene();
  }

  /**
   * ゲームアクション通知
   *
   * @return 通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this.#gameAction;
  }

  /**
   * メール認証未完了画面を開始する
   *
   * @param mailAddress 認証メール送信先
   * @return 開始されたメール認証未完了画面
   */
  startMailVerifiedIncomplete(mailAddress: string): MailVerifiedIncomplete {
    this.#removeCurrentScene();

    const scene = new MailVerifiedIncomplete(mailAddress);
    this.#root.appendChild(scene.getRootHTMLElement());
    this.#unsubscribers = [
      scene.gotoTitleNotifier().subscribe(() => {
        this.#gameAction.next({type: 'ExitMailVerifiedIncomplete'});
      }),
      scene.reloadNotifier().subscribe(() => {
        this.#gameAction.next({type: 'ReloadRequest'});
      })
    ];

    this.#scene = scene;
    return scene;
  }

  /**
   * 新しくローディング画面を開始する
   *
   * @param loading 読み込み状況ストリーム
   * @return 開始されたローディング画面
   */
  startLoading(loading: Stream<LoadingActions>): Loading {
    this.#removeCurrentScene();
    const scene = new Loading(loading);
    this.#root.appendChild(scene.getRootHTMLElement());

    this.#scene = scene
    return scene;
  }

  /**
   * 新しくタイトル画面を開始する
   *
   * @param params タイトル画面コンストラクタパラメータ
   * @return 開始されたタイトル画面
   */
  async startTitle(params: TitleParams): Promise<Title> {
    this.#removeCurrentScene();

    const scene = new Title(params);
    this.#unsubscribers = [
      scene.pushLoginNotifier().subscribe(() => {
        this.#gameAction.next({type: 'UniversalLogin'});
      }),
      scene.pushLogoutNotifier().subscribe(() => {
        this.#gameAction.next({type: 'Logout'});
      }),
      scene.pushDeleteAccountNotifier().subscribe(() => {
        this.#gameAction.next({type: 'AccountDeleteConsent'});
      }),
      scene.pushArcadeNotifier().subscribe(() => {
        this.#gameAction.next({type: 'ArcadeStart'});
      }),
      scene.pushHowToPlayNotifier().subscribe(() => {
        this.#gameAction.next({type: 'ShowHowToPlay'});
      }),
      scene.pushCasualMatchNotifier().subscribe(() => {
        this.#gameAction.next({type: 'CasualMatchStart'});
      }),
      scene.pushConfigNotifier().subscribe(() => {
        this.#gameAction.next({type: 'ConfigChangeStart'});
      }),
      scene.pushTutorialNotifier().subscribe(() => {
        this.#gameAction.next({type: 'TutorialStart'});
      })
    ];
    this.#root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME)
    ]);

    this.#scene = scene;
    return scene;
  }

  /**
   * 新しくプレイヤー選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたプレイヤー選択画面
   */
  async startPlayerSelect(resources: Resources): Promise<PlayerSelect> {
    this.#removeCurrentScene();

    const scene = new PlayerSelect(resources);
    this.#unsubscribers = [
      scene.decideNotifier().subscribe(v => {
        this.#gameAction.next({
          type: 'SelectionComplete',
          armdozerId: v.armdozerId,
          pilotId: v.pilotId,
        });
      }),
      scene.prevNotifier().subscribe(() => {
        this.#gameAction.next({type: 'SelectionCancel'});
      }),
    ];
    this.#root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this.#scene = scene;
    return scene;
  }

  /**
   * 新しく対戦カード画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   * @return 開始された対戦カード画面
   */
  async startMatchCard(resources: Resources, player: ArmDozerId, enemy: ArmDozerId, caption: string): Promise<MatchCard> {
    this.#removeCurrentScene();

    const scene = new MatchCard({
      resources: resources,
      player: player,
      enemy: enemy,
      caption: caption
    });
    this.#root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this.#scene = scene;
    return scene;
  }

  /**
   * ステージタイトル画面を開始する
   *
   * @param param パラメータ
   * @returns 開始されたNPCステージタイトル画面
   */
  async startStageTitle(param: StageTitleParam): Promise<StageTitle> {
    this.#removeCurrentScene();

    const scene = new StageTitle(param);
    this.#root.appendChild(scene.getRootHTMLElement());
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this.#scene = scene;
    return scene;
  }

  /**
   * 新しくNPCエンディング画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param bgm BGM管理オブジェクト
   * @return 開始されたNPCエンディング画面
   */
  async startNPCEnding(resources: Resources, bgm: BGMManager): Promise<NPCEnding> {
    this.#removeCurrentScene();

    const scene = new NPCEnding(resources, bgm);
    this.#root.appendChild(scene.getRootHTMLElement());
    this.#unsubscribers = [
      scene.endNPCEndingNotifier().subscribe(() => {
        this.#gameAction.next({type: 'EndNPCEnding'});
      })
    ];
    await Promise.race([
      scene.waitUntilLoaded(),
      waitTime(MAX_LOADING_TIME),
    ]);

    this.#scene = scene;
    return scene;
  }

  /**
   * 設定画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   * @return 開始された設定画面
   */
  startConfig(resources: Resources, config: GbraverBurstBrowserConfig): Config {
    this.#removeCurrentScene();

    const scene = new Config(resources, config);
    this.#root.appendChild(scene.getRootHTMLElement());
    this.#unsubscribers = [
      scene.prevNotifier().subscribe(() => {
        this.#gameAction.next({type: 'ConfigChangeCancel'});
      }),
      scene.configChangeNotifier().subscribe(config => {
        this.#gameAction.next({type: 'ConfigChangeComplete', config});
      })
    ];
    this.#scene = scene;
    return scene;
  }

  /**
   * チュートリアル選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param stages ステージ情報
   * @return 開始された設定画面
   */
  startTutorialSelector(resources: Resources, stages: TutorialStage[]): TutorialSelector {
    this.#removeCurrentScene();

    const scene = new TutorialSelector(resources, stages);
    this.#root.appendChild(scene.getRootHTMLElement());
    this.#scene = scene;
    return scene;
  }

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    this.#removeCurrentScene();
  }

  /**
   * 本クラスのルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 現在表示しているシーンを取り除く
   */
  #removeCurrentScene(): void {
    this.#scene && this.#scene.destructor();
    this.#scene && this.#scene.getRootHTMLElement().remove();
    this.#scene = null;

    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
    this.#unsubscribers = [];
  }
}