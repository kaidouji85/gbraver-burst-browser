import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import {
  getViewPortHeight,
  getViewPortWidth,
} from "../view-port/view-port-size";
import type { Resize } from "../window/resize";
import type { RendererDOMEvent } from "./dom-event/dom-event";
import { createDOMEventStream } from "./dom-event/dom-event";
import type { OverlapEvent } from "./overlap-event/overlap-event";
import { toOverlapStream } from "./overlap-event/overlap-event";
import type { OverlapNotifier } from "./overlap-notifier";
import type { RendererDomGetter } from "./renderer-dom-getter";
import type { Rendering } from "./rendering";

/** レンダラ管理オブジェクト */
export class Renderer implements OverlapNotifier, RendererDomGetter, Rendering {
  #threeJsRender: THREE.WebGLRenderer;
  #domEvent: Observable<RendererDOMEvent>;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resize リサイズのストリーム
   */
  constructor(resize: Observable<Resize>) {
    this.#threeJsRender = new THREE.WebGLRenderer();
    this.#threeJsRender.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.#threeJsRender.autoClear = false;

    this.#threeJsRender.setSize(getViewPortWidth(), getViewPortHeight());

    this.#threeJsRender.setPixelRatio(window.devicePixelRatio);

    this.#domEvent = createDOMEventStream(this.#threeJsRender.domElement);
    this.#unsubscriber = [
      resize.subscribe((action) => {
        this.#resize(action);
      }),
    ];
  }

  /**
   * レンダラが内部的に持つリソースを破棄する
   * シーン終了時に呼ばれる想定
   */
  disposeRenders(): void {
    this.#threeJsRender.renderLists.dispose();
  }

  /**
   * オーバーラップイベント通知を生成する
   * @param camera カメラ
   * @returns 生成結果
   */
  createOverlapNotifier(camera: THREE.Camera): Observable<OverlapEvent> {
    return toOverlapStream(this.#domEvent, this.getRendererDOM(), camera);
  }

  /**
   * three.jsレンダラのHTML要素を取得する
   * @returns 取得結果
   */
  getRendererDOM(): HTMLElement {
    return this.#threeJsRender.domElement;
  }

  /**
   * ピクセルレートを設定する
   * @param pixelRatio ピクセルレート
   */
  setPixelRatio(pixelRatio: number): void {
    const normalizedPixelRatio = Math.min(window.devicePixelRatio, pixelRatio);

    this.#threeJsRender.setPixelRatio(normalizedPixelRatio);
  }

  /**
   * レンダリングをする
   * @param scene シーン
   * @param camera カメラ
   */
  rendering(scene: THREE.Scene, camera: THREE.Camera): void {
    this.#threeJsRender.render(scene, camera);
  }

  /**
   * リサイズ時の処理
   * @param action アクション
   */
  #resize(action: Resize): void {
    this.#threeJsRender.setSize(action.width, action.height);
  }
}
