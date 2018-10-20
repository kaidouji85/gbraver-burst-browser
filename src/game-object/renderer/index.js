// @flow

import * as THREE from 'three';
import type {DOMEvent} from "../../action/dom-event";
import type {Resize} from "../../action/dom-event/resize";
import type {Render} from "../../action/game-loop/render";

type Param = {
  renderer: THREE.WebGLRenderer,
  listener: {
    domEvent: DOMEvent
  }
};

/** レンダラの挙動をまとめたもの */
export class Renderer {
  _renderer: THREE.WebGLRenderer;

  constructor(param: Param) {
    this._renderer = param.renderer;
  }

  /** リサイズ */
  _resize(action: Resize): void {

  }

  /** レンダリング */
  _render(action: Render): void {

  }
}