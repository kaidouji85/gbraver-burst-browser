import { Unsubscribable } from "rxjs";

import { CssHUDUIScale } from "../css/hud-ui-scale";
import { Renderer } from "../render";
import { TDScene } from "./td-scene";

/** three.js系シーンをバインドする */
export class TDSceneBinder {
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
   * @param renderer レンダラ管理オブジェクト
   * @param hudUIScale cssカスタムプロパティ --hud-ui-scale
   */
  constructor(renderer: Renderer, hudUIScale: CssHUDUIScale) {
    this.#renderer = renderer;
    this.#hudUIScale = hudUIScale;
    this.#scene = null;
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
   * @param scene バインドするシーン
   * @param unsubscribers バインドするシーンに関連するアンサブスクライバ
   */
  bind<X extends TDScene>(scene: X, unsubscribers: Unsubscribable[]): void {
    this.#disposeScene();
    this.#scene = scene;
    scene.getDOMLayerElements().forEach((element) => {
      this.#domLayerElement.appendChild(element);
    });
    this.#unsubscribers = unsubscribers;
    // iPadOS 15.7で--hud-ui-scaleに正しい値がセットされないことがあった
    // なので、3Dシーンが始まる前に強制的に値を更新している
    this.#hudUIScale.update();
  }

  /**
   * 3Dシーンを非表示にする
   */
  hidden(): void {
    this.#disposeScene();
  }

  /**
   * DOMレイヤーのルートHTML要素を取得する
   * @returns 取得結果
   */
  getDOMLayerElements(): HTMLElement[] {
    return [this.#domLayerElement];
  }

  /**
   * 現在表示しているシーンを破棄する
   */
  #disposeScene(): void {
    this.#scene?.destructor();
    this.#renderer.dispose();
    this.#domLayerElement.innerHTML = "";
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }
}
