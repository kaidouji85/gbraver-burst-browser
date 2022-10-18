// @flow
import type {ArmDozerId} from "gbraver-burst-core";
import type {BGMManager} from '../../bgm/bgm-manager';
import type {Resources} from "../../resource";
import type {LoadingActions} from "../../resource/loading-actions";
import type {Stream} from "../../stream/stream";
import type {GbraverBurstBrowserConfig} from "../config/browser-config";
import type {GameAction} from "../game-actions";
import {discardCurrentScene} from "./discard-current-scene";
import type {DOMScenesProps} from "./props";
import {createDOMScenesProps} from "./props";
import {Config} from "./scene/config";
import {Loading} from "./scene/loading";
import {MailVerifiedIncomplete} from "./scene/mail-verified-incomplete/mail-verified-incomplete";
import {MatchCard} from "./scene/match-card";
import {NPCEnding} from "./scene/npc-ending/npc-ending";
import {PlayerSelect} from "./scene/player-select";
import type {StageTitleParam} from "./scene/stage-title/stage-title";
import {StageTitle} from "./scene/stage-title/stage-title";
import type {TitleParams} from "./scene/title";
import {Title} from "./scene/title";
import type {TutorialStage} from "./scene/tutorial-selector/tutoria-stage-element";
import {TutorialSelector} from "./scene/tutorial-selector/tutorial-selector";
import type {TutorialTitleParams} from "./scene/tutorial-title";
import {TutorialTitle} from "./scene/tutorial-title";
import {startConfig} from "./start/start-config";
import {startLoading} from "./start/start-loading";
import {startMailVerifiedIncomplete} from "./start/start-mail-verified-incomplete";
import {startMatchCard} from "./start/start-match-card";
import {startNPCEnding} from "./start/start-npc-ending";
import {startPlayerSelect} from "./start/start-player-select";
import {startStageTitle} from "./start/start-stage-title";
import {startTitle} from "./start/start-title";
import {startTutorialSelector} from "./start/start-tutorial-selector";
import {startTutorialTitle} from "./start/start-tutorial-title";

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  #props: DOMScenesProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createDOMScenesProps();
  }

  /** 
   * デストラクタ相当の処理
   */
  destructor() {
    discardCurrentScene(this.#props);
  }

  /**
   * ゲームアクション通知
   *
   * @return 通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this.#props.gameAction;
  }

  /**
   * メール認証未完了画面を開始する
   *
   * @param mailAddress 認証メール送信先
   * @return 開始されたメール認証未完了画面
   */
  startMailVerifiedIncomplete(mailAddress: string): MailVerifiedIncomplete {
    return startMailVerifiedIncomplete(this.#props, mailAddress);
  }

  /**
   * 新しくローディング画面を開始する
   *
   * @param loading 読み込み状況ストリーム
   * @return 開始されたローディング画面
   */
  startLoading(loading: Stream<LoadingActions>): Loading {
    return startLoading(this.#props, loading);
  }

  /**
   * 新しくタイトル画面を開始する
   *
   * @param params タイトル画面コンストラクタパラメータ
   * @return 開始されたタイトル画面
   */
  async startTitle(params: TitleParams): Promise<Title> {
    return await startTitle(this.#props, params);
  }

  /**
   * 新しくプレイヤー選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @return 開始されたプレイヤー選択画面
   */
  async startPlayerSelect(resources: Resources): Promise<PlayerSelect> {
    return await startPlayerSelect(this.#props, resources);
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
    return await startMatchCard(this.#props, resources, player, enemy, caption);
  }

  /**
   * ステージタイトル画面を開始する
   *
   * @param param パラメータ
   * @returns 開始されたNPCステージタイトル画面
   */
  async startStageTitle(param: StageTitleParam): Promise<StageTitle> {
    return await startStageTitle(this.#props, param);
  }

  /**
   * 新しくNPCエンディング画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param bgm BGM管理オブジェクト
   * @return 開始されたNPCエンディング画面
   */
  async startNPCEnding(resources: Resources, bgm: BGMManager): Promise<NPCEnding> {
    return await startNPCEnding(this.#props, resources, bgm);
  }

  /**
   * 設定画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param config Gブレイバーバースト ブラウザ側設定項目
   * @return 開始された設定画面
   */
  startConfig(resources: Resources, config: GbraverBurstBrowserConfig): Config {
    return startConfig(this.#props, resources, config);
  }

  /**
   * チュートリアル選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param stages ステージ情報
   * @return 開始された設定画面
   */
  startTutorialSelector(resources: Resources, stages: TutorialStage[]): TutorialSelector {
    return startTutorialSelector(this.#props, resources, stages);
  }

  /**
   * チュートリアルタイトル画面を開始する
   *
   * @param params 画面パラメータ
   * @return 開始されたチュートリアルタイトル画面
   */
  async startTutorialTitle(params: TutorialTitleParams): Promise<TutorialTitle> {
    return await startTutorialTitle(this.#props, params);
  }

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    discardCurrentScene(this.#props);
  }

  /**
   * 本クラスのルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}