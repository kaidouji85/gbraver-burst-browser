// @flow

import * as THREE from "three";
import {createHUDCamera} from "../../../camera/create-hud-camera";
import type {DOMEvent} from "../../../action/dom-event";
import {Observable, Subscription} from "rxjs";
import type {Resize} from "../../../action/dom-event/resize";
import {onResizeOrthographicCamera} from "../../../camera/resize";
import {HUD_CAMERA_ZINDEX} from "../../../zindex/hud-zindex";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>
  }
};

/**
 * 汎用HUDレイヤー用カメラ
 * 本カメラは一切視点変更を行わないカメラである
 */
export class PlainHUDCamera {
  _camera: THREE.OrthographicCamera;
  _subscription: Subscription;

  constructor(param: Param) {
    this._camera = createHUDCamera();
    this._camera.position.z = HUD_CAMERA_ZINDEX;

    this._subscription = param.listener.domEvent.subscribe(action => {
      if (action.type === 'resize') {
        this._resize(action);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /** カメラを取得する */
  getCamera(): THREE.Camera {
    return this._camera;
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onResizeOrthographicCamera(this._camera, action.width, action.height);
  }
}