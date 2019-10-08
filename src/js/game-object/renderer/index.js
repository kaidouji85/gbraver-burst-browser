// @flow

import * as THREE from 'three';
import type {Resize} from "../../action/dom-event/resize";
import type {Render} from "../../action/game-loop/render";
import {merge, Observable} from "rxjs";
import {onWebGLRendererResize} from "../../render/resize";
import {createDOMEventListener} from "../../action/dom-event/create-listener";
import type {DOMEvent} from "../../action/dom-event";
import {WebGLInfo} from "three";

/** コンストラクタのパラメータ */
type Param = {
  threeJsRender: THREE.WebGLRenderer,
  listener: {
    render: Observable<Render>
  }
};

/** イベント通知ストリーム */
type Notifier = {
  domEvent: Observable<DOMEvent>
};

/** レンダラの挙動をまとめたもの */
export class Renderer {
  _threeJsRender: THREE.WebGLRenderer;
  _domEvent: Observable<DOMEvent>;

  constructor(param: Param) {
    this._threeJsRender = param.threeJsRender;
    this._domEvent = createDOMEventListener(this._threeJsRender.domElement);

    merge(
      this._domEvent,
      param.listener.render
    ).subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      } else if (action.type === 'Render') {
        this._render(action);
      }
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