// @flow

import * as THREE from "three";
import {createHUDCamera} from "../../../camera/create-hud-camera";
import {Observable, Subscription} from "rxjs";
import type {Resize} from "../../../dom/resize/resize";
import {onResizeOrthographicCamera} from "../../../camera/resize";
import {HUD_CAMERA_ZINDEX} from "../../../zindex/hud-zindex";

/**
 * 汎用HUDレイヤー用カメラ
 * 本カメラは一切視点変更を行わないカメラである
 */
export class PlainHUDCamera {
  _camera: typeof THREE.OrthographicCamera;
  _subscription: Subscription;

  constructor(resize: Observable<Resize>) {
    this._camera = createHUDCamera();
    this._camera.position.z = HUD_CAMERA_ZINDEX;

    this._subscription = resize.subscribe(action => {
      this._resize(action);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._subscription.unsubscribe();
  }

  /** カメラを取得する */
  getCamera(): typeof THREE.Camera {
    return this._camera;
  }

  /** リサイズ */
  _resize(action: Resize): void {
    onResizeOrthographicCamera(this._camera, action.width, action.height);
  }
}