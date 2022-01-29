// @flow

import * as THREE from "three";
import {createHUDCamera} from "../../../camera/create-hud-camera";
import type {Resize} from "../../../window/resize";
import {onResizeOrthographicCamera} from "../../../camera/resize";
import {HUD_CAMERA_ZINDEX} from "../../../zindex/hud-zindex";
import type {Stream, Unsubscriber} from "../../../stream/core";

/**
 * 汎用HUDレイヤー用カメラ
 * 本カメラは一切視点変更を行わないカメラである
 */
export class PlainHUDCamera {
  _camera: typeof THREE.OrthographicCamera;
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Stream<Resize>) {
    this._camera = createHUDCamera();
    this._camera.position.z = HUD_CAMERA_ZINDEX;
    this._unsubscriber = resize.subscribe(action => {
      this._resize(action);
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this._unsubscriber.unsubscribe();
  }

  /**
   * カメラを取得する
   *
   * @return カメラ
   */
  getCamera(): typeof THREE.Camera {
    return this._camera;
  }

  /**
   * リサイズ
   *
   * @param action アクション
   */
  _resize(action: Resize): void {
    onResizeOrthographicCamera(this._camera, action.width, action.height);
  }
}