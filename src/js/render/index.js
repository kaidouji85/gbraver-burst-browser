// @flow

import * as THREE from 'three';
import {WebGLInfo} from 'three';
import type {Resize} from "../window/resize";
import type {RendererDOMEvent} from "./dom-event/dom-event";
import {createDOMEventStream} from "./dom-event/dom-event";
import type {OverlapEvent} from "./overlap-event/overlap-event";
import {toOverlapStream} from "./overlap-event/overlap-event";
import type {OverlapNotifier} from "./overla-notifier";
import type {RendererDomGetter} from "./renderer-dom-getter";
import type {Rendering} from "./rendering";
import type {Stream, Unsubscriber} from "../stream/core";
import {renderPixelRatio} from "./pixel-ratio/pixel-ratio";
import {getViewPortHeight, getViewPortWidth} from "../view-port/view-port-size";

/** レンダラの挙動をまとめたもの */
export class Renderer implements OverlapNotifier, RendererDomGetter, Rendering {
  _threeJsRender: typeof THREE.WebGLRenderer;
  _domEvent: Stream<RendererDOMEvent>;
  _unsubscriber: Unsubscriber[];
  _pixelRatio: number;

  /**
   * コンストラクタ
   *
   * @param initialPixelRatio ピクセルレート初期値
   * @param resize リサイズのストリーム
   */
  constructor(initialPixelRatio: number, resize: Stream<Resize>) {
    this._pixelRatio = renderPixelRatio(initialPixelRatio);
    this._threeJsRender = new THREE.WebGLRenderer();
    this._threeJsRender.autoClear = false;
    this._threeJsRender.setSize(getViewPortWidth(), getViewPortHeight());
    this._threeJsRender.setPixelRatio(this._pixelRatio);
    this._domEvent = createDOMEventStream(this._threeJsRender.domElement);
    this._unsubscriber = [
      resize.subscribe(action => {
        this._resize(action);
      })
    ];
  }

  /**
   * レンダラが内部的に持つリソースを破棄する
   * シーン終了時に呼ばれる想定
   */
  disposeRenders(): void {
    this._threeJsRender.renderLists.dispose();
  }

  /**
   * オーバーラップイベント通知を生成する
   *
   * @param camera カメラ
   * @return 生成結果
   */
  createOverlapNotifier(camera: typeof THREE.Camera): Stream<OverlapEvent> {
    return toOverlapStream(this._domEvent, this.getRendererDOM(), camera);
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
   * ピクセルレートを設定する
   *
   * @param pixelRatio ピクセルレート
   */
  setPixelRatio(pixelRatio: number): void {
    this._pixelRatio = renderPixelRatio(pixelRatio);
    this._threeJsRender.setPixelRatio(this._pixelRatio);
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
    this._threeJsRender.setSize(action.width, action.height);
  }
}