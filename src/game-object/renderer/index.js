// @flow

import * as THREE from 'three';
import type {DOMEvent} from "../../action/dom-event";
import type {Resize} from "../../action/dom-event/resize";
import type {Render} from "../../action/game-loop/render";
import {Observable} from "rxjs";
import {onWebGLRendererResize} from "../../render/resize";

type Param = {
  renderer: THREE.WebGLRenderer,
  listener: {
    domEvent: Observable<DOMEvent>,
    render: Observable<Render>
  }
};

/** レンダラの挙動をまとめたもの */
export class Renderer {
  _renderer: THREE.WebGLRenderer;

  constructor(param: Param) {
    this._renderer = param.renderer;

    param.listener.domEvent.subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      }
    });
    param.listener.render.subscribe(action => {
      this._render(action);
    });
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