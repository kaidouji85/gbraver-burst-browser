// @flow

import * as THREE from 'three';
import type {DOMEvent} from "../../action/dom-event";
import type {Resize} from "../../action/dom-event/resize";
import type {Render} from "../../action/game-loop/render";
import {merge, Observable, Observer, Subject} from "rxjs";
import {onWebGLRendererResize} from "../../render/resize";

type Param = {
  renderer: THREE.WebGLRenderer,
  listener: {
    domEvent: Observable<DOMEvent>
  }
};

/** レンダラの挙動をまとめたもの */
export class Renderer {
  _renderer: THREE.WebGLRenderer;
  _renderSubject: Subject<Render>;

  constructor(param: Param) {
    this._renderer = param.renderer;
    this._renderSubject = new Subject<Render>();

    merge(
      param.listener.domEvent,
      this._renderSubject
    ).subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      } else if (action.type === 'Render') {
        this._render(action);
      }
    });
  }

  /** レンダリング通知オブジェクトを取得する */
  getRenderNotifier(): Observer<Render> {
    return this._renderSubject;
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onWebGLRendererResize(this._renderer, action.width, action.height, window.devicePixelRatio);
  }

  /** レンダリング */
  _render(action: Render): void {
    this._renderer.render(action.scene, action.camera);
  }
}