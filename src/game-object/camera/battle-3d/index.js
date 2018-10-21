// @flow

import * as THREE from "three";
import type {DOMEvent} from "../../../action/dom-event";
import type {Resize} from "../../../action/dom-event/resize";
import {onResizePerspectiveCamera} from "../../../camera/resize";
import {Observable} from "rxjs";
import {createCamera} from "./create-camera";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>,
  }
};

/** 戦闘シーン3Dレイヤー用カメラ */
export class Battle3DCamera {
  _camera: THREE.PerspectiveCamera;

  constructor(param: Param) {
    this._camera = createCamera();

    param.listener.domEvent.subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      }
    })
  }

  /** カメラを取得する */
  getCamera(): THREE.Camera {
    return this._camera;
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onResizePerspectiveCamera(this._camera, action.width, action.height);
  }
}