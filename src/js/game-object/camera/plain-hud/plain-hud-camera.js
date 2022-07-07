// @flow

import * as THREE from "three";
import {createHUDCamera} from "../../../camera/create-hud-camera";
import {onResizeOrthographicCamera} from "../../../camera/resize";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {Resize} from "../../../window/resize";
import {HUD_CAMERA_ZINDEX} from "../../hud-zindex";

/**
 * 汎用HUDレイヤー用カメラ
 * 本カメラは一切視点変更を行わないカメラである
 */
export class PlainHUDCamera {
  #camera: typeof THREE.OrthographicCamera;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Stream<Resize>) {
    this.#camera = createHUDCamera();
    this.#camera.position.z = HUD_CAMERA_ZINDEX;
    this.#unsubscriber = resize.subscribe(action => {
      this.#resize(action);
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this.#unsubscriber.unsubscribe();
  }

  /**
   * カメラを取得する
   *
   * @return カメラ
   */
  getCamera(): typeof THREE.Camera {
    return this.#camera;
  }

  /**
   * リサイズ
   *
   * @param action アクション
   */
  #resize(action: Resize): void {
    onResizeOrthographicCamera(this.#camera, action.width, action.height);
  }
}