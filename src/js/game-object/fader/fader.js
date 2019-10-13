/// @flow

import * as THREE from 'three';
import {FaderView} from "./view/fader-view";

/** 画面フェーダー */
export class Fader {
  _view: FaderView;

  constructor() {
    this._view = new FaderView();
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}