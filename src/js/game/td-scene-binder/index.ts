import { Observable, Subject, Unsubscribable } from "rxjs";

import { CssHUDUIScale } from "../../css/hud-ui-scale";
import { Renderer } from "../../render";
import type { TDScene } from "../../td-scenes/td-scene";
import type { GameAction } from "../game-actions";
import type { TDSceneActionConnector } from "./td-scene-action-connector";

/** three.js系シーンをバインドする */
export class TDSceneBinder {
  /** ゲームアクション */
  #gameAction: Subject<GameAction>;

  /** DOMレイヤーをバインドするHTML要素 */
  #domLayerElement: HTMLElement;

  /** 現在表示中のシーン、何も表示していない場合はnullがセットされる */
  #scene: TDScene | null;

  /** cssカスタムプロパティ --hud-ui-scale */
  #hudUIScale: CssHUDUIScale;

  /** レンダラ管理オブジェクト */
  #renderer: Renderer;

  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param renderer レンダラ管理オブジェクト
   * @param hudUIScale cssカスタムプロパティ --hud-ui-scale
   */
  constructor(renderer: Renderer, hudUIScale: CssHUDUIScale) {
    this.#renderer = renderer;
    this.#hudUIScale = hudUIScale;
    this.#scene = null;
    this.#gameAction = new Subject();
    this.#domLayerElement = document.createElement("div");
    this.#unsubscribers = [];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#disposeScene();
    this.#hudUIScale.destructor();
  }

  /**
   * 3D系シーンをバインドする
   *
   * @param scene バインドするシーン
   * @param connector ゲームアクションコネクタ
   */
  bind<X extends TDScene>(
    scene: X,
    connector: TDSceneActionConnector<X>,
  ): void {
    this.#disposeScene();
    this.#scene = scene;
    scene.getDOMLayerElements().forEach((element) => {
      this.#domLayerElement.appendChild(element);
    });
    this.#unsubscribers = connector(scene, this.#gameAction);
    // iPadOS 15.7で--hud-ui-scaleに正しい値がセットされないことがあった
    // なので、3Dシーンが始まる前に強制的に値を更新している
    this.#hudUIScale.update();
  }

  /**
   * ゲームアクション通知を取得する
   *
   * @returns イベント通知ストリーム
   */
  gameActionNotifier(): Observable<GameAction> {
    return this.#gameAction;
  }

  /**
   * 3Dシーンを非表示にする
   */
  hidden(): void {
    this.#disposeScene();
  }

  /**
   * DOMレイヤーのルートHTML要素を取得する
   *
   * @returns 取得結果
   */
  getDOMLayerElements(): HTMLElement[] {
    return [this.#domLayerElement];
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  #disposeScene(): void {
    this.#scene && this.#scene.destructor();
    this.#renderer.disposeRenders();
    this.#domLayerElement.innerHTML = "";
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }
}
