// @flow

import type { BGMManager } from "../../bgm/bgm-manager";
import type { Resources } from "../../resource";
import type { Stream } from "../../stream/stream";
import type { GbraverBurstBrowserConfig } from "../config/browser-config";
import type { GameAction } from "../game-actions";
import type { DOMSceneActionConnector } from "./action-connector/dom-scene-action-connector";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMScene } from "./dom-scene";
import type { DOMScenesProps } from "./props";
import { createDOMScenesProps } from "./props";
import { Config } from "./scene/config";
import { NPCEnding } from "./scene/npc-ending/npc-ending";
import type { StageTitleParam } from "./scene/stage-title/stage-title";
import { StageTitle } from "./scene/stage-title/stage-title";
import type { TutorialStage } from "./scene/tutorial-selector/tutoria-stage-element";
import { TutorialSelector } from "./scene/tutorial-selector/tutorial-selector";
import type { TutorialTitleParams } from "./scene/tutorial-title";
import { TutorialTitle } from "./scene/tutorial-title";
import { startConfig } from "./start/start-config";
import { startNPCEnding } from "./start/start-npc-ending";
import { startStageTitle } from "./start/start-stage-title";
import { startTutorialSelector } from "./start/start-tutorial-selector";
import { startTutorialTitle } from "./start/start-tutorial-title";

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
   * DOMシーンをバインドする
   *
   * @param scene バインドするシーン
   * @param connector ゲームアクションコネクタ
   */
  bind<X: DOMScene>(scene: X, connector: DOMSceneActionConnector<X>): void {
    discardCurrentScene(this.#props);
    this.#props.scene = scene;
    this.#props.root.appendChild(scene.getRootHTMLElement());
    this.#props.unsubscribers = connector(scene, this.#props.gameAction);
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
   * @deprecated
   * ステージタイトル画面を開始する
   *
   * @param param パラメータ
   * @returns 開始されたNPCステージタイトル画面
   */
  async startStageTitle(param: StageTitleParam): Promise<StageTitle> {
    return await startStageTitle(this.#props, param);
  }

  /**
   * @deprecated
   * 新しくNPCエンディング画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param bgm BGM管理オブジェクト
   * @return 開始されたNPCエンディング画面
   */
  async startNPCEnding(
    resources: Resources,
    bgm: BGMManager
  ): Promise<NPCEnding> {
    return await startNPCEnding(this.#props, resources, bgm);
  }

  /**
   * @deprecated
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
   * @deprecated
   * チュートリアル選択画面を開始する
   *
   * @param resources リソース管理オブジェクト
   * @param stages ステージ情報
   * @return 開始された設定画面
   */
  startTutorialSelector(
    resources: Resources,
    stages: TutorialStage[]
  ): TutorialSelector {
    return startTutorialSelector(this.#props, resources, stages);
  }

  /**
   * @deprecated
   * チュートリアルタイトル画面を開始する
   *
   * @param params 画面パラメータ
   * @return 開始されたチュートリアルタイトル画面
   */
  async startTutorialTitle(
    params: TutorialTitleParams
  ): Promise<TutorialTitle> {
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
