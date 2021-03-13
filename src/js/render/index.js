// @flow

import * as THREE from 'three';
import {WebGLInfo} from 'three';
import type {Resize} from "../window/resize";
import {Observable, Subscription} from "rxjs";
import {onWebGLRendererResize} from "./resize/resize";
import type {RendererDOMEvent} from "./dom-event/dom-event";
import {createDOMEventStream} from "./dom-event/dom-event";
import {createRender} from "./renderer-creator/renderer-creator";
import type {OverlapEvent} from "./overlap-event/overlap-event";
import {toOverlapStream} from "./overlap-event/overlap-event";
import type {OverlapNotifier} from "./overla-notifier";
import type {RendererDomGetter} from "./renderer-dom-getter";
import type {Rendering} from "./rendering";
import type {Stream} from "../stream/core";
import {toStream} from "../stream/rxjs";

/** コンストラクタのパラメータ */
type Param = {
  resize: Observable<Resize>,
};

/** レンダラの挙動をまとめたもの */
export class Renderer implements OverlapNotifier, RendererDomGetter, Rendering {
  _threeJsRender: typeof THREE.WebGLRenderer;
  _domEvent: Observable<RendererDOMEvent>;
  _subscriptions: Subscription[];

  constructor(param: Param) {
    this._threeJsRender = createRender();
    this._domEvent = createDOMEventStream(this._threeJsRender.domElement);

    this._subscriptions = [
      param.resize.subscribe(action => {
        this._resize(action);
      })
    ];
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * リソースを破棄する
   */
  dispose(): void {
    this._threeJsRender.renderLists.dispose();
  }

  /**
   * オーバーラップイベント通知を生成する
   *
   * @param camera カメラ
   * @return 生成結果
   */
  createOverlapNotifier(camera: typeof THREE.Camera): Stream<OverlapEvent> {
    return toOverlapStream(toStream(this._domEvent), this.getRendererDOM(), camera);
  }

  /**
   * デバッグ用情報を返す
   *
   * @return デバッグ用情報
   */
  info(): typeof WebGLInfo {
    return this._threeJsRender.info;
  }

  /**
   * three.jsレンダラのHTML要素を取得する
   *
   * @return 取得結果
   */
  getRendererDOM(): HTMLElement {
    return this._threeJsRender.domElement;
  }

  /**
   * レンダリングをする
   *
   * @param scene シーン
   * @param camera カメラ
   */
  rendering(scene: typeof THREE.Scene, camera: typeof THREE.Camera): void {
    this._threeJsRender.render(scene, camera);
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onWebGLRendererResize(this._threeJsRender, action.width, action.height, window.devicePixelRatio);
  }
}