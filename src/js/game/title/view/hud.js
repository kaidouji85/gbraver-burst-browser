// @flow

import * as THREE from 'three';
import type {DOMEvent} from "../../../action/dom-event";
import {PlainHUDCamera} from "../../../game-object/camera/plain-hud";
import {Observable} from "rxjs";

/** コンストラクタのパラメータ */
type Param = {
  listener: {
    domEvent: Observable<DOMEvent>
  }
};

/** タイトルシーン HUDレイヤー */
export class TitleHudLayer {
  scene: THREE.Scene;
  camera: PlainHUDCamera;

  constructor(param: Param) {
    this.scene = new THREE.Scene();
    this.camera = new PlainHUDCamera({
      listener: {
        domEvent: param.listener.domEvent
      }
    });
  }

  /** デストラクタ相当処理 */
  destructor(): void {
    this.camera.destructor();
  }
}