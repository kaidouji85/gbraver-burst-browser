// @flow

import * as THREE from 'three';
import {WebGLInfo} from 'three';
import type {Resize} from "../../action/resize/resize";
import type {Render} from "../../action/game-loop/render";
import {merge, Observable, Subscription} from "rxjs";
import {onWebGLRendererResize} from "../../render/resize";
import type {TdDOMEvent} from "../../action/td-dom";
import {createDOMEventStream} from "../../action/td-dom";

/** コンストラクタのパラメータ */
type Param = {
  threeJsRender: THREE.WebGLRenderer,
  renderStream: Observable<Render>,
  resize: Observable<Resize>,
};

/** イベント通知ストリーム */
type Notifier = {
  domEvent: Observable<TdDOMEvent>
};

/** レンダラの挙動をまとめたもの */
export class Renderer {
  _threeJsRender: THREE.WebGLRenderer;
  _domEvent: Observable<TdDOMEvent>;
  _subscriptions: Subscription[];

  constructor(param: Param) {
    this._threeJsRender = param.threeJsRender;
    this._domEvent = createDOMEventStream(this._threeJsRender.domElement);

    this._subscriptions = [
      param.resize.subscribe(action => {
        this._resize(action);
      }),

      param.renderStream.subscribe(action => {
        this._render(action);
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
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      domEvent: this._domEvent
    };
  }

  /**
   * デバッグ用情報を返す
   *
   * @return デバッグ用情報
   */
  info(): WebGLInfo {
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

  /** リサイズ */
  _resize(action: Resize): void {
    onWebGLRendererResize(this._threeJsRender, action.width, action.height, window.devicePixelRatio);
  }

  /** レンダリング */
  _render(action: Render): void {
    this._threeJsRender.render(action.scene, action.camera);
  }
}