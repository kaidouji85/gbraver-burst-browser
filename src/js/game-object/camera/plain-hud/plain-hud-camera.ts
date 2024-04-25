import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { createHUDCamera } from "../../../camera/create-hud-camera";
import { onResizeOrthographicCamera } from "../../../camera/resize";
import type { Resize } from "../../../window/resize";
import { HUD_CAMERA_ZINDEX } from "../../hud-zindex";

/**
 * 汎用HUDレイヤー用カメラ
 * 本カメラは一切視点変更を行わないカメラである
 */
export class PlainHUDCamera {
  #camera: THREE.OrthographicCamera;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   *
   * @param resize リサイズストリーム
   */
  constructor(resize: Observable<Resize>) {
    this.#camera = createHUDCamera();
    this.#camera.position.z = HUD_CAMERA_ZINDEX;
    this.#unsubscriber = resize.subscribe((action) => {
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
   * @returns カメラ
   */
  getCamera(): THREE.Camera {
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
